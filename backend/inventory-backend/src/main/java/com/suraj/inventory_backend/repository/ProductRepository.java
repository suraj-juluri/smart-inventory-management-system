package com.suraj.inventory_backend.repository;

import com.suraj.inventory_backend.dto.CategoryInventoryResponse;
import com.suraj.inventory_backend.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Search products by name
    List<Product> findByProductNameContainingIgnoreCase(String keyword);

    // Find products by category
    List<Product> findByCategoryIgnoreCase(String category);

    // Find low-stock products
    @Query("SELECT p FROM Product p WHERE p.quantity < p.minimumStock")
    List<Product> findLowStockProducts();

    // Find out-of-stock products
    @Query("SELECT p FROM Product p WHERE p.quantity = 0")
    List<Product> findOutOfStockProducts();

    // Sort products by price - ascending
    List<Product> findAllByOrderByPriceAsc();

    // Sort products by price - descending
    List<Product> findAllByOrderByPriceDesc();

    // Category-wise inventory statistics
    @Query("""
            SELECT new com.suraj.inventory_backend.dto.CategoryInventoryResponse(
                p.category,
                COUNT(p),
                SUM(p.quantity)
            )
            FROM Product p
            GROUP BY p.category
            ORDER BY p.category
            """)
    List<CategoryInventoryResponse> getCategoryInventory();
}