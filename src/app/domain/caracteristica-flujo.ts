export class CaracteristicaFlujo 
{

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $descripcion
     * @return {string}
     */
	public get $descripcion(): string {
		return this.descripcion;
	}

    /**
     * Getter $flujosCompatibles
     * @return {Array<number>}
     */
	public get $flujosCompatibles(): Array<number> {
		return this.flujosCompatibles;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $descripcion
     * @param {string} value
     */
	public set $descripcion(value: string) {
		this.descripcion = value;
	}

    /**
     * Setter $flujosCompatibles
     * @param {Array<number>} value
     */
	public set $flujosCompatibles(value: Array<number>) {
		this.flujosCompatibles = value;
	}
    private id : number;
    private descripcion : string;
    public flujosCompatibles : Array<number>;
    public status : boolean;

}
