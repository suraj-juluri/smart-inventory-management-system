import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  ProductService,
  Product
} from '../services/product';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  // ==============================
  // PRODUCTS
  // ==============================

  products: Product[] = [];


  // ==============================
  // SEARCH & FILTER
  // ==============================

  searchKeyword: string = '';

  selectedCategory: string = '';


  // ==============================
  // PAGINATION
  // ==============================

  currentPage: number = 0;

  pageSize: number = 5;

  totalPages: number = 0;

  totalElements: number = 0;


  // ==============================
  // SORTING
  // ==============================

  sortBy: string = 'id';

  direction: string = 'asc';


  private productService = inject(ProductService);
private router = inject(Router);
private cdr = inject(ChangeDetectorRef);

  // ==============================
  // INITIALIZE
  // ==============================

  ngOnInit(): void {

    console.log(
      'Products component loaded'
    );

    this.loadProducts();

  }


  // ==============================
  // LOAD PRODUCTS
  // ==============================

  loadProducts(): void {

    this.productService
      .getProductsPage(
        this.currentPage,
        this.pageSize,
        this.sortBy,
        this.direction
      )
      .subscribe({

        next: (data) => {

          console.log(
            'PAGINATION API RESPONSE:',
            data
          );

          this.products =
            data.content;

          this.totalPages =
            data.totalPages;

          this.totalElements =
            data.totalElements;

          console.log(
            'Products on current page:',
            this.products.length
          );

          console.log(
            'Total products:',
            this.totalElements
          );

          console.log(
            'Total pages:',
            this.totalPages
          );

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Product pagination API error:',
            error
          );

        }

      });

  }


  // ==============================
  // SEARCH
  // ==============================

  searchProducts(): void {

    const keyword =
      this.searchKeyword.trim();


    if (keyword === '') {

      this.currentPage = 0;

      this.loadProducts();

      return;
    }


    this.productService
      .searchProducts(keyword)
      .subscribe({

        next: (data: Product[]) => {

          console.log(
            'SEARCH RESULT:',
            data
          );

          this.products = data;

          this.totalPages = 1;

          this.totalElements =
            data.length;

          this.currentPage = 0;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Search error:',
            error
          );

        }

      });

  }


  // ==============================
  // CATEGORY FILTER
  // ==============================

  filterByCategory(): void {

    if (this.selectedCategory === '') {

      this.currentPage = 0;

      this.loadProducts();

      return;
    }


    this.productService
      .getProductsByCategory(
        this.selectedCategory
      )
      .subscribe({

        next: (data: Product[]) => {

          console.log(
            'CATEGORY RESULT:',
            data
          );

          this.products = data;

          this.totalPages = 1;

          this.totalElements =
            data.length;

          this.currentPage = 0;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Category filter error:',
            error
          );

        }

      });

  }


  // ==============================
  // RESET
  // ==============================

  resetFilters(): void {

    this.searchKeyword = '';

    this.selectedCategory = '';

    this.currentPage = 0;

    this.loadProducts();

  }


  // ==============================
  // SORTING
  // ==============================

  changeSort(): void {

    console.log(
      'Sorting:',
      this.sortBy,
      this.direction
    );

    this.currentPage = 0;

    this.loadProducts();

  }


  // ==============================
  // PREVIOUS PAGE
  // ==============================

  previousPage(): void {

    if (this.currentPage > 0) {

      this.currentPage--;

      this.loadProducts();

    }

  }


  // ==============================
  // NEXT PAGE
  // ==============================

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages - 1
    ) {

      this.currentPage++;

      this.loadProducts();

    }

  }


  // ==============================
  // EDIT PRODUCT
  // ==============================

  editProduct(id: number): void {

    console.log(
      'Editing product ID:',
      id
    );

    this.router.navigate([
      '/edit-product',
      id
    ]);

  }


  // ==============================
  // DELETE PRODUCT
  // ==============================

  deleteProduct(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this product?'
    );


    if (!confirmed) {

      return;

    }


    this.productService
      .deleteProduct(id)
      .subscribe({

        next: () => {

          console.log(
            'Product deleted:',
            id
          );

          alert(
            'Product deleted successfully!'
          );


          if (
            this.products.length === 1 &&
            this.currentPage > 0
          ) {

            this.currentPage--;

          }


          this.loadProducts();

        },

        error: (error) => {

          console.error(
            'Delete product error:',
            error
          );

          alert(
            'Failed to delete product.'
          );

        }

      });

  }

}