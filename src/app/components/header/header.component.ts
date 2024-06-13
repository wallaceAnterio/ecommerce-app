import { Component, inject } from '@angular/core';

import { CartApiService } from '../../services/cart-api.service';
import { CartComponent } from '../cart/cart.component';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-header',
   standalone: true,
   imports: [CartComponent, RouterLink],
   templateUrl: './header.component.html',
   styleUrl: './header.component.scss',
})
export class HeaderComponent {
   cartApi = inject(CartApiService);

   getcartItemCount() {
      return this.cartApi.getCarItemCount();
   }
}
