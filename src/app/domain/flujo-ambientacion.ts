export class FlujoAmbientacion 
{

    /**
     * Getter $idFlujo
     * @return {number}
     */
	public get $idFlujo(): number {
		return this.idFlujo;
	}

    /**
     * Setter $idFlujo
     * @param {number} value
     */
	public set $idFlujo(value: number) {
		this.idFlujo = value;
    }
    
    
    private idFlujo : number;

    /**
     * Getter $nombreflujo
     * @return {string}
     */
	public get $nombreflujo(): string {
		return this.nombreflujo;
	}

    /**
     * Setter $nombreflujo
     * @param {string} value
     */
	public set $nombreflujo(value: string) {
		this.nombreflujo = value;
	}
    private nombreflujo : string;


    /**
     * Getter $status
     * @return {boolean}
     */
	public get $status(): boolean {
		return this.status;
	}

    /**
     * Setter $status
     * @param {boolean} value
     */
	public set $status(value: boolean) {
		this.status = value;
	}
    public status : boolean;


    
}
