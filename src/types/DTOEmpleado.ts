export enum Rol {
    Administrador = 'Administrador',
    Cajero = 'Cajero',
    Delivery = 'Delivery',
    Cliente = 'Cliente',
    Cocinero = 'Cocinero',
}

export interface DtoEmpleado {
    id: number;
    nombre: string;
    apellido: string;
    rol: Rol;
    email: string;
    telefono: string;
    localidad: string;
    calle: string;
    numero: string;
    estado: string;

}

