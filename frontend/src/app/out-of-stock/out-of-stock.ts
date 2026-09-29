import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ProductService,
  Product
} from '../services/product';

@Component({
  selector: 'app-out-of-stock',
  imports: [CommonModule],
  templateUrl: './out-of-stock.html',
  styleUrl: './out-of-stock.css'
})
export class OutOfStock implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOutOfStockProducts();
  }

  loadOutOfStockProducts(): void {

    this.productService.getOutOfStockProducts().subscribe({

      next: (data: Product[]) => {

        console.log('OUT OF STOCK PRODUCTS:', data);

        this.products = data;

        this.cdr.detectChanges();
      },

      error: (error: any) =>  {

        console.error('Out of stock API error:', error);

      }

    });
  }
}