export class User {
    /**
     * @param {{ id:number, email:string, nombre?:string, premium?:boolean }} param0
     */
    constructor({ id, email, nombre = '', premium = false }) {
        this.id = id;
        this.email = email;
        this.fullName = nombre;
        this.premium = premium;
        Object.freeze(this);
    }
}
