export class Password{
    private readonly value: string;
    constructor(password: string){
      if(!this.lengthValid(password)){
        throw new Error('tamaño mas de 6 characters')
      }
      this.value = password;
    }
    private lengthValid(password: string):boolean{
      return password !== undefined && password.trim().length >= 6;
    }
    getValue():string{
      return this.value;
    }
}

