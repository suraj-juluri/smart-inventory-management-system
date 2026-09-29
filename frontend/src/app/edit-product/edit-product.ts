import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ProductService,
  Product,
  ProductRequest
} from '../services/product';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit {

  productId: number = 0;

  product: ProductRequest = {
    productName: '',
    category: '',
    price: 0,
    quantity: 0,
    minimumStock: 0
  };

  constructor(
  private route: ActivatedRoute,
  private productService: ProductService,
  public router: Router
) {}

  ngOnInit(): void {

    this.productId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadProduct();
  }

  loadProduct(): void {

    this.productService
      .getProductById(this.productId)
      .subscribe({

        next: (data: Product) => {

          console.log('Product loaded:', data);

          this.product = {
            productName: data.productName,
            category: data.category,
            price: data.price,
            quantity: data.quantity,
            minimumStock: data.minimumStock
          };

        },

        error: (error) => {

          console.error('Get product error:', error);

          alert('Product not found.');

          this.router.navigate(['/products']);

        }

      });
  }

  updateProduct(): void {

    this.productService
      .updateProduct(this.productId, this.product)
      .subscribe({

        next: (data) => {

          console.log('Product updated:', data);

          alert('Product updated successfully!');

          this.router.navigate(['/products']);

        },

        error: (error) => {

          console.error('Update product error:', error);

          alert('Failed to update product.');

        }

      });
  }
}