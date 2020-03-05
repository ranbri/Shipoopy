import { ProdCategory } from './prodCategory';
export class Product {
    public constructor(
        public _id?: string,
        public name?: string,
        public prodCategory?: ProdCategory,
        public price?: number) {
    }
}