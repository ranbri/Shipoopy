import { Address } from './address';
export class Customer {
    public constructor(
        public _id?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public username?: string,
        public password?: string,
        public phone?: string,
        public address?: Address) {
    }
}