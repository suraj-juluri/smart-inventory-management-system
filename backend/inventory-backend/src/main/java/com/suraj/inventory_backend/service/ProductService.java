package com.suraj.inventory_backend.service;

import com.suraj.inventory_backend.dto.CategoryInventoryResponse;
import com.suraj.inventory_backend.dto.DashboardResponse;
import com.suraj.inventory_backend.dto.ProductRequest;
import com.suraj.inventory_backend.dto.StockRequest;
import com.suraj.inventory_backend.entity.Product;
import com.suraj.inventory_backend.exception.ProductNotFoundException;
import com.suraj.inventory_backend.repository.ProductRepository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ==============================
    // CREATE PRODUCT
    // ==============================

    public Product createProduct(ProductRequest request) {

        Product product = new Product();

        product.setProductName(request.getProductName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setMinimumStock(request.getMinimumStock());

        return productRepository.save(product);
    }


    // ==============================
    // GET ALL PRODUCTS
    // ==============================

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    // ==============================
    // GET PRODUCT BY ID
    // ==============================

    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
        new ProductNotFoundException(
                "Product not found with id: " + id
        )
);
    }


    // ==============================
    // UPDATE PRODUCT
    // ==============================

    public Product updateProduct(
            Long id,
            ProductRequest request) {

        Product product = getProductById(id);

        product.setProductName(request.getProductName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setMinimumStock(request.getMinimumStock());

        return productRepository.save(product);
    }


    // ==============================
    // DELETE PRODUCT
    // ==============================

    public void deleteProduct(Long id) {

        Product product = getProductById(id);

        productRepository.delete(product);
    }


    // ==============================
    // SEARCH PRODUCTS
    // ==============================

    public List<Product> searchProducts(
            String keyword) {

        return productRepository
                .findByProductNameContainingIgnoreCase(keyword);
    }


    // ==============================
    // CATEGORY FILTER
    // ==============================

    public List<Product> getProductsByCategory(
            String category) {

        return productRepository
                .findByCategoryIgnoreCase(category);
    }


    // ==============================
    // LOW STOCK PRODUCTS
    // ==============================

    public List<Product> getLowStockProducts() {

        return productRepository
                .findLowStockProducts();
    }


    // ==============================
    // OUT OF STOCK PRODUCTS
    // ==============================

    public List<Product> getOutOfStockProducts() {

        return productRepository
                .findOutOfStockProducts();
    }


    // ==============================
    // UPDATE STOCK
    // ==============================

    public Product updateStock(
            Long id,
            StockRequest stockRequest) {

        Product product = getProductById(id);

        product.setQuantity(
                stockRequest.getQuantity()
        );

        return productRepository.save(product);
    }


    // ==============================
    // DASHBOARD
    // ==============================

    public DashboardResponse getDashboard() {

        List<Product> products =
                productRepository.findAll();

        long totalProducts =
                products.size();


        long totalQuantity =
                products.stream()
                        .mapToLong(
                                product ->
                                        product.getQuantity()
                        )
                        .sum();


        long lowStockProducts =
                products.stream()
                        .filter(product ->
                                product.getQuantity() > 0 &&
                                product.getQuantity()
                                        < product.getMinimumStock()
                        )
                        .count();


        long outOfStockProducts =
                products.stream()
                        .filter(product ->
                                product.getQuantity() == 0
                        )
                        .count();


        double totalInventoryValue =
                products.stream()
                        .mapToDouble(product ->
                                product.getPrice()
                                        * product.getQuantity()
                        )
                        .sum();


        return new DashboardResponse(
                totalProducts,
                totalQuantity,
                lowStockProducts,
                outOfStockProducts,
                totalInventoryValue
        );
    }


    // ==============================
    // PAGINATION + SORTING
    // ==============================

    public Page<Product>
    getProductsWithPaginationAndSorting(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort;

        if (direction.equalsIgnoreCase("desc")) {

            sort = Sort.by(sortBy).descending();

        } else {

            sort = Sort.by(sortBy).ascending();
        }


        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        sort
                );


        return productRepository
                .findAll(pageable);
    }


    // ==============================
    // CATEGORY INVENTORY STATISTICS
    // ==============================

    public List<CategoryInventoryResponse>
    getCategoryInventory() {

        return productRepository
                .getCategoryInventory();
    }
}