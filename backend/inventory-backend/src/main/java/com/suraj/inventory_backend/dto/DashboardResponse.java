package com.suraj.inventory_backend.dto;

public class DashboardResponse {

    private long totalProducts;
    private long totalQuantity;
    private long lowStockProducts;
    private long outOfStockProducts;
    private double totalInventoryValue;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalProducts,
                             long totalQuantity,
                             long lowStockProducts,
                             long outOfStockProducts,
                             double totalInventoryValue) {

        this.totalProducts = totalProducts;
        this.totalQuantity = totalQuantity;
        this.lowStockProducts = lowStockProducts;
        this.outOfStockProducts = outOfStockProducts;
        this.totalInventoryValue = totalInventoryValue;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public long getLowStockProducts() {
        return lowStockProducts;
    }

    public void setLowStockProducts(long lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }

    public long getOutOfStockProducts() {
        return outOfStockProducts;
    }

    public void setOutOfStockProducts(long outOfStockProducts) {
        this.outOfStockProducts = outOfStockProducts;
    }

    public double getTotalInventoryValue() {
        return totalInventoryValue;
    }

    public void setTotalInventoryValue(double totalInventoryValue) {
        this.totalInventoryValue = totalInventoryValue;
    }
}