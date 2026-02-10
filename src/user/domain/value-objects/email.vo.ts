export class Email{
  private readonly value: string;
  constructor(email: string){
    if(!this.isvalid(email)){
      throw new Error('Ivalid email format')
    }
    this.value = email;
  }
  private isvalid(email: string):boolean{
    return email.includes('@')
  }
  getValue(): string{
    return this.value;
  }
  equals(other: Email){
    return this.value === other.value;
  }
}

