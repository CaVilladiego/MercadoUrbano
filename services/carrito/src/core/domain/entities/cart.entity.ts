import { CartItem } from './cart-item.entity';

export class Cart {
  constructor(
    public id: string,
    public userId: string,
    public items: CartItem[] = [],
  ) {}
}
