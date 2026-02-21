export class CartItem {
  constructor(
    public id: string | null,
    public productId: string,
    public quantity: number,
  ) {}
}
