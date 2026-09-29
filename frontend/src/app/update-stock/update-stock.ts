import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  ProductService,
  StockRequest
} from '../services/product';

@Component({
  selector: 'app-update-stock',
  imports: [FormsModule],
  templateUrl: './update-stock.html',
  styleUrl: './update-stock.css'
})
export class UpdateStock {

  productId: number = 0;
  quantity: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  updateStock(): void {

    const stockRequest: StockRequest = {
      quantity: this.quantity
    };

    this.productService
      .updateStock(this.productId, stockRequest)
      .subscribe({

        next: (data) => {
          console.log('Stock updated:', data);

          alert('Stock updated successfully!');

          this.router.navigate(['/products']);
        },

        error: (error) => {
          console.error('Update stock error:', error);

          alert('Failed to update stock.');
        }

      });
  }
}