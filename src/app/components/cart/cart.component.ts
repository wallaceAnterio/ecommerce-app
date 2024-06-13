import { Component, inject } from '@angular/core';
import { Product } from '../../models/Product';
import { CartApiService } from '../../services/cart-api.service';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-cart',
   standalone: true,
   imports: [RouterLink],
   templateUrl: './cart.component.html',
   styleUrl: './cart.component.scss',
})
export class CartComponent {
   cartItems: Product[] = [];
   totalAmount: number = 0;

   cartApiService = inject(CartApiService);

   ngOnInit() {
      this.cartItems = this.cartApiService.getCartItems();
      this.calculateTotalAmount();
   }

   calculateTotalAmount() {
      this.totalAmount = this.cartItems.reduce(
         (total, item) => total + item.price * item.quantity, 0
      );
   }

   removeProduct(product: Product) {
      this.cartApiService.removeCartItem(product);
      this.calculateTotalAmount();
   }
}
