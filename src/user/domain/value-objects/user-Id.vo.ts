import { randomUUID } from "crypto";

export class UserId{
  private readonly value:string;
  constructor( id?: string){
    this.value = id || randomUUID();
  }
  getvalue(): string{
    return this.value;
  }
  equals(other: UserId){
    return this.value === other.value;
  }
}
