export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: string,
    public readonly stock: string,
    public readonly estado: string,
  ) {}
}
