import { AppState } from './appState';
import { Action } from './action';
import { ActionType } from './actionType';
export class Reducer {
    public static reduce(oldState: AppState, action: Action): AppState {
        const newState = { ...oldState };
        const overallPrice = () => newState.currentCart.overallPrice = newState.currentCart.cartProducts.map(cp => cp.totalPrice).reduce((acc, cur) => acc + cur, 0);
        switch (action.type) {
            // //User
            // New Cart
            case ActionType.newCart:
                newState.currentCart = action.payload;
                overallPrice();
                break;
            // Add Product To Cart
            case ActionType.addCartProduct:
                newState.currentCart.cartProducts.push(action.payload);
                overallPrice();
                break;
            // Update Cart Product
            case ActionType.updateCartProduct:
                newState.currentCart.cartProducts[newState.currentCart.cartProducts.findIndex((cp) => cp.product._id === action.payload.product._id)] = action.payload;
                overallPrice();
                break;
            // Remove Cart Product
            case ActionType.removeCartProduct:
                newState.currentCart.cartProducts.splice(newState.currentCart.cartProducts.findIndex((cp) => cp.product._id === action.payload), 1);
                overallPrice();
                break;
            // //Admin
            // Update Product
            case ActionType.updateProduct:
                newState.foundProducts[newState.foundProducts.indexOf(action.payload._id)] = action.payload;
                break;
        }
        return newState;
    }
}