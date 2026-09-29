import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ProductService,
  Product
} from '../services/product';

@Component({
  selector: 'app-low-stock',
  imports: [CommonModule],
  templateUrl: './low-stock.html',
  styleUrl: './low-stock.css'
})
export class LowStock implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLowStockProducts();
  }

  loadLowStockProducts(): void {

    this.productService.getLowStockProducts().subscribe({

      next: (data: Product[]) => {

        console.log('LOW STOCK PRODUCTS:', data);

        this.products = data;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Low stock API error:', error);

      }

    });
  }
}