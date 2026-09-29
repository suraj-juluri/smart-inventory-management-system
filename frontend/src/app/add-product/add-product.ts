import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService, ProductRequest } from '../services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {

  product: ProductRequest = {
    productName: '',
    category: '',
    price: 0,
    quantity: 0,
    minimumStock: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct(): void {

    this.productService.addProduct(this.product).subscribe({
      next: (data) => {
        console.log('Product added:', data);

        alert('Product added successfully!');

        this.router.navigate(['/products']);
      },

      error: (error) => {
        console.error('Add product error:', error);

        alert('Failed to add product.');
      }
    });
  }
}