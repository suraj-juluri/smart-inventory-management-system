import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// ==============================
// PRODUCT
// ==============================

export interface Product {

  id: number;

  productName: string;

  category: string;

  price: number;

  quantity: number;

  minimumStock: number;

}


// ==============================
// PRODUCT REQUEST
// ==============================

export interface ProductRequest {

  productName: string;

  category: string;

  price: number;

  quantity: number;

  minimumStock: number;

}


// ==============================
// STOCK REQUEST
// ==============================

export interface StockRequest {

  quantity: number;

}


// ==============================
// DASHBOARD RESPONSE
// ==============================

export interface DashboardResponse {

  totalProducts: number;

  totalQuantity: number;

  lowStockProducts: number;

  outOfStockProducts: number;

  totalInventoryValue: number;

}


// ==============================
// CATEGORY INVENTORY RESPONSE
// ==============================

export interface CategoryInventoryResponse {

  category: string;

  productCount: number;

  totalQuantity: number;

}


// ==============================
// PRODUCT SERVICE
// ==============================

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl =
    'http://localhost:8080/api/products';


  constructor(
    private http: HttpClient
  ) {}


  // ==============================
  // GET ALL PRODUCTS
  // ==============================

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(
      this.apiUrl
    );

  }


  // ==============================
  // GET PRODUCT BY ID
  // ==============================

  getProductById(
    id: number
  ): Observable<Product> {

    return this.http.get<Product>(
      `${this.apiUrl}/${id}`
    );

  }


  // ==============================
  // ADD PRODUCT
  // ==============================

  addProduct(
    product: ProductRequest
  ): Observable<Product> {

    return this.http.post<Product>(
      this.apiUrl,
      product
    );

  }


  // ==============================
  // UPDATE PRODUCT
  // ==============================

  updateProduct(
    id: number,
    product: ProductRequest
  ): Observable<Product> {

    return this.http.put<Product>(
      `${this.apiUrl}/${id}`,
      product
    );

  }


  // ==============================
  // DELETE PRODUCT
  // ==============================

  deleteProduct(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }


  // ==============================
  // SEARCH PRODUCTS
  // ==============================

  searchProducts(
    keyword: string
  ): Observable<Product[]> {

    return this.http.get<Product[]>(
      `${this.apiUrl}/search?keyword=${encodeURIComponent(keyword)}`
    );

  }


  // ==============================
  // CATEGORY FILTER
  // ==============================

  getProductsByCategory(
    category: string
  ): Observable<Product[]> {

    return this.http.get<Product[]>(
      `${this.apiUrl}/category/${encodeURIComponent(category)}`
    );

  }


  // ==============================
  // LOW STOCK
  // ==============================

  getLowStockProducts():
    Observable<Product[]> {

    return this.http.get<Product[]>(
      `${this.apiUrl}/low-stock`
    );

  }


  // ==============================
  // OUT OF STOCK
  // ==============================

  getOutOfStockProducts():
    Observable<Product[]> {

    return this.http.get<Product[]>(
      `${this.apiUrl}/out-of-stock`
    );

  }


  // ==============================
  // UPDATE STOCK
  // ==============================

  updateStock(
    id: number,
    stockRequest: StockRequest
  ): Observable<Product> {

    return this.http.put<Product>(
      `${this.apiUrl}/${id}/stock`,
      stockRequest
    );

  }


  // ==============================
  // DASHBOARD
  // ==============================

  getDashboard():
    Observable<DashboardResponse> {

    return this.http.get<DashboardResponse>(
      `${this.apiUrl}/dashboard`
    );

  }


  // ==============================
  // PAGINATION + SORTING
  // ==============================

  getProductsPage(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'id',
    direction: string = 'asc'
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/page?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
    );

  }


  // ==============================
  // CATEGORY INVENTORY
  // ==============================

  getCategoryInventory():
    Observable<CategoryInventoryResponse[]> {

    return this.http.get<CategoryInventoryResponse[]>(
      `${this.apiUrl}/category-inventory`
    );

  }

}