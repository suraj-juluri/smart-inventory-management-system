import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ProductService,
  Product
} from '../services/product';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications implements OnInit {

  // Products that need attention
  lowStockProducts: Product[] = [];
  outOfStockProducts: Product[] = [];

  // Total number of alerts
  totalAlerts: number = 0;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Notifications component loaded');

    this.loadNotifications();
  }

  // ==============================
  // LOAD NOTIFICATIONS
  // ==============================

  loadNotifications(): void {

    // Get low-stock products
    this.productService.getLowStockProducts().subscribe({

      next: (data: Product[]) => {

        console.log('Low stock notifications:', data);

        this.lowStockProducts = data;

        this.calculateTotalAlerts();

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Low stock notification error:',
          error
        );

      }

    });


    // Get out-of-stock products
    this.productService.getOutOfStockProducts().subscribe({

      next: (data: Product[]) => {

        console.log('Out of stock notifications:', data);

        this.outOfStockProducts = data;

        this.calculateTotalAlerts();

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Out of stock notification error:',
          error
        );

      }

    });

  }

  // ==============================
  // CALCULATE TOTAL ALERTS
  // ==============================

  calculateTotalAlerts(): void {

    this.totalAlerts =
      this.lowStockProducts.length +
      this.outOfStockProducts.length;

  }

  // ==============================
  // REFRESH NOTIFICATIONS
  // ==============================

  refreshNotifications(): void {

    console.log('Refreshing notifications...');

    this.loadNotifications();

  }

}