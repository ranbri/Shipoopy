import { Product } from '../models/product';
import { ProdCategory } from '../models/prodCategory';
import { Customer } from '../models/customer';
import { Admin } from '../models/admin';
import { Cart } from '../models/cart';

export class AppState{
    // Products
    public categoryProducts: Product[] = [];
    public prodCategories : ProdCategory[] = [];
    public foundProducts : Product[] = [];
    // Users  
    public currentUser : Customer | Admin ;
    public loggedIn : boolean = false;
    public admin : boolean = false;
    public currentCart : Cart;
    // Misc.
    public searchOn : boolean = false;
    public cities : any = [];
    public loading : boolean = false;
}