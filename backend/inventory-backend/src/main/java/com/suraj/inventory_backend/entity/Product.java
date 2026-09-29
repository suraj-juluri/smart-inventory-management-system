package com.suraj.inventory_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String productName;

    @NotBlank(message = "Category is required")
    @Column(nullable = false)
    private String category;

    @Positive(message = "Price must be greater than 0")
    @Column(nullable = false)
    private Double price;

    @Min(value = 0, message = "Quantity cannot be negative")
    @Column(nullable = false)
    private Integer quantity;

    @Min(value = 0, message = "Minimum stock cannot be negative")
    @Column(nullable = false)
    private Integer minimumStock;

    public Product() {
    }

    public Product(Long id, String productName, String category,
                   Double price, Integer quantity, Integer minimumStock) {
        this.id = id;
        this.productName = productName;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.minimumStock = minimumStock;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getMinimumStock() {
        return minimumStock;
    }

    public void setMinimumStock(Integer minimumStock) {
        this.minimumStock = minimumStock;
    }
}