export class Persona 
{
    private nombre: string;
    edad: number


    constructor(nombre : string, edad : number)
    {
        this.nombre = nombre;
        this.edad = edad;
    }

    getNombre()
    {
        return this.nombre;
    }
}
