export class UserModel {
    constructor(
        public codigo: string,
        public nombre:string,
        public rol: string,
        public sedes: string,
        public categorias: string,
        public dominio: string
    ){}
}