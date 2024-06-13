import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
   providedIn: 'root',
})
export class NotificationService {
   snacBar = inject(MatSnackBar);

   showSuccess(message: string) {
      this.snacBar.open(message, 'close', {
         duration: 3000,
         horizontalPosition: 'center',
         verticalPosition: 'bottom',
         panelClass: 'success-snackbar'
      })

   }

   showError(message: string) {
      this.snacBar.open(message, 'close', {
         duration: 3000,
         horizontalPosition: 'center',
         verticalPosition: 'top',
         panelClass: 'error-snackbar'
      })
   }
}
