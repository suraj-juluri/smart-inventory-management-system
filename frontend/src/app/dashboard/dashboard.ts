import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ProductService,
  DashboardResponse,
  CategoryInventoryResponse
} from '../services/product';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  // ==============================
  // SERVICES
  // ==============================

  private productService = inject(ProductService);

  private cdr = inject(ChangeDetectorRef);


  // ==============================
  // DASHBOARD DATA
  // ==============================

  dashboard: DashboardResponse = {

    totalProducts: 0,

    totalQuantity: 0,

    lowStockProducts: 0,

    outOfStockProducts: 0,

    totalInventoryValue: 0

  };


  // ==============================
  // CATEGORY INVENTORY
  // ==============================

  categoryInventory: CategoryInventoryResponse[] = [];


  // ==============================
  // INITIALIZE
  // ==============================

  ngOnInit(): void {

    console.log(
      'Dashboard component loaded'
    );

    this.loadDashboard();

    this.loadCategoryInventory();

  }


  // ==============================
  // LOAD DASHBOARD
  // ==============================

  loadDashboard(): void {

    this.productService
      .getDashboard()
      .subscribe({

        next: (data: DashboardResponse) => {

          console.log(
            'Dashboard data:',
            data
          );

          this.dashboard = data;

          this.cdr.detectChanges();

        },

        error: (error: any) => {

          console.error(
            'Dashboard API error:',
            error
          );

        }

      });

  }


  // ==============================
  // LOAD CATEGORY INVENTORY
  // ==============================

  loadCategoryInventory(): void {

    this.productService
      .getCategoryInventory()
      .subscribe({

        next: (
          data: CategoryInventoryResponse[]
        ) => {

          console.log(
            'Category inventory data:',
            data
          );

          this.categoryInventory = data;

          this.cdr.detectChanges();

        },

        error: (error: any) => {

          console.error(
            'Category inventory API error:',
            error
          );

        }

      });

  }


  // ==============================
  // REFRESH DASHBOARD
  // ==============================

  refreshDashboard(): void {

    console.log(
      'Refreshing dashboard...'
    );

    this.loadDashboard();

    this.loadCategoryInventory();

  }

}