export class Product {
  constructor(
    public readonly id_producto: string,
    public readonly id_vendedor: string,
    public readonly nombre: string,
    public readonly descripcion: string,
    public readonly precio: number,
    public readonly stock: number,
    public readonly estado: boolean,
  ) {}
}
