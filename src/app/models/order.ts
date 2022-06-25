import { CartItem } from 'src/app/models/cart';

export class Order {
  id?: string;
  email?: string;
  orderItems?: CartItem[];
  firstName?: string;
  lastName?: string;
  city?: string;
  zip?: string;
  country?: string;
  address?: string;
  phone?: string;
  status?: string;
  totalPrice?: string;
  user?: any;
  dateOrdered?: string;
}
