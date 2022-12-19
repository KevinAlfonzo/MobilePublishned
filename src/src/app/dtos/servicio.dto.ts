export class ServicioDto {
    id: string = '';
    categoria: string = '';
    nombre: string = '';
    precio: string = '';
    stock: string = '';
    estado: string = '';
}

export class Tablatemporal {
    cantidad: number = 0;
    idservicio: number = 0;
    precio: number = 0;
    subtotal: number = 0;
    nombre: string = '';
}