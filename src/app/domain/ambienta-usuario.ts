import { FlujoAmbientacion } from './flujo-ambientacion';
import { Cliente } from './cliente';
import {deserialize} from 'json-typescript-mapper';
import {JsonObject, JsonProperty} from "json2typescript";

export class AmbientaUsuario 
{

    /**
     * Getter $flujo
     * @return {number}
     */
	public get $flujo(): number {
		return this.flujo;
	}

    /**
     * Getter $numUsuarios
     * @return {number}
     */
	public get $numUsuarios(): number {
		return this.numUsuarios;
	}

    /**
     * Getter $infoCliente
     * @return {Array<Cliente>}
     */
	public get $infoCliente(): Array<Cliente> {
		return this.infoCliente;
	}

    /**
     * Setter $flujo
     * @param {number} value
     */
	public set $flujo(value: number) {
		this.flujo = value;
	}

    /**
     * Setter $numUsuarios
     * @param {number} value
     */
	public set $numUsuarios(value: number) {
		this.numUsuarios = value;
	}

    /**
     * Setter $infoCliente
     * @param {Array<Cliente>} value
     */
	public set $infoCliente(value: Array<Cliente>) {
		this.infoCliente = value;
	}

    constructor
    () 
    {}

    public flujo : number;
    public numUsuarios : number;
    public caracteristicas : Array<number>
    public codigo : number;
    public infoCliente : Array<Cliente>;
    public usuarioLogin : string

	
}
