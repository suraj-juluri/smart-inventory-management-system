package com.suraj.inventory_backend.controller;

import com.suraj.inventory_backend.dto.CategoryInventoryResponse;
import com.suraj.inventory_backend.dto.DashboardResponse;
import com.suraj.inventory_backend.dto.ProductRequest;
import com.suraj.inventory_backend.dto.StockRequest;
import com.suraj.inventory_backend.entity.Product;
import com.suraj.inventory_backend.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    // ==============================
    // CREATE PRODUCT
    // ==============================

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @Valid @RequestBody ProductRequest request) {

        Product product =
                productService.createProduct(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(product);
    }


    // ==============================
    // GET ALL PRODUCTS
    // ==============================

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllProducts()
        );
    }


    // ==============================
    // GET PRODUCT BY ID
    // ==============================

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }


    // ==============================
    // UPDATE PRODUCT
    // ==============================

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(
                        id,
                        request
                )
        );
    }


    // ==============================
    // DELETE PRODUCT
    // ==============================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity
                .noContent()
                .build();
    }


    // ==============================
    // SEARCH PRODUCTS
    // ==============================

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                productService.searchProducts(keyword)
        );
    }


    // ==============================
    // CATEGORY FILTER
    // ==============================

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>>
    getProductsByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                productService.getProductsByCategory(category)
        );
    }


    // ==============================
    // LOW STOCK
    // ==============================

    @GetMapping("/low-stock")
    public ResponseEntity<List<Product>>
    getLowStockProducts() {

        return ResponseEntity.ok(
                productService.getLowStockProducts()
        );
    }


    // ==============================
    // OUT OF STOCK
    // ==============================

    @GetMapping("/out-of-stock")
    public ResponseEntity<List<Product>>
    getOutOfStockProducts() {

        return ResponseEntity.ok(
                productService.getOutOfStockProducts()
        );
    }


    // ==============================
    // UPDATE STOCK
    // ==============================

    @PutMapping("/{id}/stock")
    public ResponseEntity<Product> updateStock(
            @PathVariable Long id,
            @Valid @RequestBody StockRequest stockRequest) {

        return ResponseEntity.ok(
                productService.updateStock(
                        id,
                        stockRequest
                )
        );
    }


    // ==============================
    // DASHBOARD
    // ==============================

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse>
    getDashboard() {

        return ResponseEntity.ok(
                productService.getDashboard()
        );
    }


    // ==============================
    // PAGINATION + SORTING
    // ==============================

    @GetMapping("/page")
    public ResponseEntity<Page<Product>>
    getProductsWithPaginationAndSorting(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return ResponseEntity.ok(
                productService
                        .getProductsWithPaginationAndSorting(
                                page,
                                size,
                                sortBy,
                                direction
                        )
        );
    }


    // ==============================
    // CATEGORY INVENTORY STATISTICS
    // ==============================

    @GetMapping("/category-inventory")
    public ResponseEntity<List<CategoryInventoryResponse>>
    getCategoryInventory() {

        return ResponseEntity.ok(
                productService.getCategoryInventory()
        );
    }
}