import { Customer } from './customer';
import { Address } from './address';
import { Cart } from './cart';
export class Order {
    public constructor(
        public customer?: Customer,
        public cart?: Cart,
        public address?: Address,
        public orderDate?: any,
        public cc?: {
            number: string,
            expiration: {month: string, year: string},
            cvv: string
        }) {
    }
}