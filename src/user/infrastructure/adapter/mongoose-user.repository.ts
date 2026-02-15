import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/entites/user.entity';
import { UserId } from '../../domain/value-objects/user-Id.vo';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { UserRepositoryPort } from '../../application/port/user.repository.port';
import { UserMongooseDoc } from './user.mongoose-schema';

@Injectable()
export class MongooseUserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(UserMongooseDoc.name)
    private readonly userModel: Model<UserMongooseDoc>,
  ) {}

  private toDomain(doc: UserMongooseDoc): User {
    return new User(
      new UserId(doc._id.toString()),
      doc.name,
      new Email(doc.email),
      new Password(doc.password),
      doc.createAt || new Date(),
      doc.updateAt || new Date(),
    );
  }

  async save(user: User): Promise<User> {
    const doc = new this.userModel({
      name: user.getName(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getValue(),
      createAt: user.getCreateAt(),
      updateAt: user.getUpdateAt(),
    });
    await doc.save();
    return new User(
      new UserId(doc._id.toString()),
      user.getName(),
      user.getEmail(),
      user.getPassword(),
      user.getCreateAt(),
      user.getUpdateAt(),
    );
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.userModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findAll(): Promise<User[]> {
    const docs = await this.userModel.find().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
