import { Customer } from './customer';
import { Admin } from './admin';
import { Product } from './product';
export class Cart {
    public constructor(
        public customer?: Customer | Admin,
        public date?: Date,
        public _id?: string,
        public cartProducts: {
            _id?: string,
            product?: Product,
            quant?: number,
            totalPrice?: number
        }[] = [],
        public overallPrice: number = 0,
        public active: boolean = true) {
    }
}