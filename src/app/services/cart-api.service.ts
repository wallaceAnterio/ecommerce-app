import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../models/Product';
import { NotificationService } from './notification.service';

@Injectable({
   providedIn: 'root',
})
export class CartApiService {
   baseUrl = 'https://fakestoreapi.com/products';

   private whishListItems: Product[] = [];
   private cartItems: Product[] = [];
   private storageKey = 'cartItems';
   private storageWishlistItemsKey = 'wishlistItems';

   http = inject(HttpClient);
   notification = inject(NotificationService);

   constructor() {
      const storageItems = localStorage.getItem(this.storageKey);
      const storedWishlistIrems = localStorage.getItem(
         this.storageWishlistItemsKey
      );
      if (storageItems) {
         this.cartItems = JSON.parse(storageItems);
      }
      if (storedWishlistIrems) {
         this.whishListItems = JSON.parse(storedWishlistIrems);
      }
   }

   fetchProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.baseUrl);
   }

   addToCart(product: Product) {
      const existingItems = this.cartItems.find(
         (item) => item.id === product.id
      );
      if (existingItems) {
         existingItems.quantity += 1;
         this.notification.showSuccess(
            `${product.title} alredy in the cart. Quantity Updated: ${existingItems.quantity}`
         );
      } else {
         product.quantity = 1;
         this.cartItems.push(product);
         this.notification.showSuccess(`${product.title} added in the cart`);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
   }

   getCarItemCount(): number {
      return this.cartItems.length;
   }

   getCartItems(): Product[] {
      return this.cartItems;
   }

   removeCartItem(product: Product) {
      const index = this.cartItems.findIndex((item) => item.id === product.id);
      if (index != -1) {
         this.cartItems.splice(index, 1);
         localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
         this.notification.showSuccess('Product removed from the cart');
      }
   }

   isInWhishlist(product: Product): boolean {
      return this.whishListItems.some((item) => item.id === product.id);
   }

   addToWishlist(product: Product) {
      this.whishListItems.push(product);
      this.notification.showSuccess(`${product.title} added to wishlist`);
      localStorage.setItem(
         this.storageWishlistItemsKey,
         JSON.stringify(this.whishListItems)
      );
   }

   removeFromWishlist(product: Product) {
      const index = this.whishListItems.findIndex(
         (item) => item.id === product.id
      );
      if (index !== -1) {
         this.whishListItems.splice(index, 1);
         localStorage.setItem(
            this.storageWishlistItemsKey,
            JSON.stringify(this.whishListItems)
         );
         this.notification.showSuccess(
            `${product.title} removed from wishlist`
         );
      }
   }
}

/* ?
Devolve o índice do primeiro elemento da matriz quando o predicado é verdadeiro e -1 caso contrário.

@param predicado
find chama o predicado uma vez para cada elemento do array, em ordem crescente, até encontrar um elemento em que o predicado retorna verdadeiro. Se um tal elemento for encontrado, findIndex devolve imediatamente o índice desse elemento. Caso contrário, findIndex devolve -1.

*/
