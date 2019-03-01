export class Cliente 
{

    //Request
    public cantidad : number = 1;
    public nombre: string = "";
    public apellidoP : string;
    public apellidoM : string;
    public genero : string;
    public numCel : string;
    public telefonoDomicilio : string;
    public correo : string;
    public curp : string;
    public rfc : string;
    public fechaNac : string;
    public idIdentificacion : string;
    public ocr : string;
    public idEdoCivil : string;
    public calle : string;
    public numExt : string;
    public numInt : string;
    public cp : string;
    public delegacion : string;
    public idEntidadFederativa : string;
    public pais : string;
    public canal : string;
    public sucursal : string;
    public tipoCte : string;
    public descripcionCte : string;
    public idAlnova : string;
    public idNegocio : string;
    public idCanal : string;
    public idCliente : string;
    public digVer : string;
    public usuario : string;
    public password : string;
    public token : string;
    public foto : string;
    public huella1: string;
    public mano1 : string;
    public dedo1 : string;
    public idNacionalidad : string;
    public nivelCte : string;
    public colonia : string;
    public estado : string;

    //Response
    public _id : string;
    public icu : string;
    public paisCu : string;
    public canalCu : string;
    public sucursalCu : string;
    public folioCu : string;
    public usuarioLogin : string;
    public cveEntidadNacimiento : string
    public estatusCliente : boolean;
    public flujo : number;
    public uuid : string = this.createUUID();


    createUUID() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
    
        var uuid = s.join("");
        return uuid;
    }

    Cliente()
    {
        this.uuid = this.createUUID();
    }

}
