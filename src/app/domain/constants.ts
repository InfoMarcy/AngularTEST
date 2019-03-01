export class Constants 
{
    
    public static get IP_SERVER_API() : string { return "https://10.51.58.240:"};
    public static get PORT_SERVER_API() : string { return "443"; };

    //lista de servicios a consumir
    public static get AMBIENTAR_USUARIOS_URL() : string { return "/ambientes/v1/usuarios/"; }
    public static get OBTENER_FLUJOS() : string { return "/ambientes/v1/flujos" }
    public static get OBTENER_CARACTERISTICAS() : string { return "/ambientes/v1/caracteristicas" }
    public static get OBTENER_CLIENTES_AMBIENTADOS_POR_USUARIO() : string { return "/ambientes/v1/consulta/usuario/" }
    public static get OBTENER_FROM_LOGIN() : string { return "https://10.51.58.238:3080/banca_digital/v1/login/" }
    public static get VALIDA_ACCESO_LOGIN() : string { return "/auth/v1/login" }


    //New Ones
    public static get ELIMINAR_CLIENTE() : string { return "/ambientes/v1/borra/usuario" }


    public static get REGISTRO() : string { return "/auth/v1/registro" }

}
