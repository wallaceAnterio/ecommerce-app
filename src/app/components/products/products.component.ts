import { Product } from './../../models/Product';
import { Component, inject } from '@angular/core';

import { CartApiService } from '../../services/cart-api.service';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-products',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './products.component.html',
   styleUrl: './products.component.scss',
})
export class ProductsComponent {
   productList: Product[] = [];
   cartApiService = inject(CartApiService);

   ngOnInit() {
      this.cartApiService.fetchProducts().subscribe((products) => {
         this.productList = products;
         console.log(products);
      });
   }

   addToCart(product: Product) {
      this.cartApiService.addToCart(product);
   }

   isInWhishlist(product: Product): boolean {
      return this.cartApiService.isInWhishlist(product);
   }

   toggleWishlist(product: Product) {
      if (this.isInWhishlist(product)) {
         this.cartApiService.removeFromWishlist(product);
      } else {
         this.cartApiService.addToWishlist(product);
      }
   }
}
