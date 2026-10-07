/*
Each function should return a Promise that resolves with mock data after a delay, or rejects with an error message.
*/

import validateNetworkError from "./modules/networkError.js";
import {
  validateDataErrorForProducts,
  validateDataErrorForReviews,
  validateDataErrorForSalesReport,
} from "./modules/dataError.js";

type Product = {
  id: number;
  name: string;
  price: number;
};

const fetchProductCatalog = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    // check network
    let productsToTest = [
      { id: 1, name: "Laptop", price: 1200 },
      { id: 2, name: "Headphones", price: 200 },
      { id: 2, name: "Shoes", price: 300 },
    ];
    validateNetworkError("online");
    validateDataErrorForProducts(productsToTest); // check for Data Errors in fields of ProductCatalog

    setTimeout(() => {
      if (Math.random() < 0.95) {
        resolve(productsToTest);
      } else {
        reject("Failed to fetch product catalog");
      }
    }, 1000);
  });
};

type Review = {
  id_Product: number;
  rating: number;
};

const fetchProductReviews = (productId: number): Promise<Review[]> => {
  return new Promise((resolve, reject) => {
    const allMockReviews = [
      { id_Product: 1, rating: 3 },
      { id_Product: 1, rating: 5 },
      { id_Product: 1, rating: 6 },
      { id_Product: 2, rating: 8 },
      { id_Product: 2, rating: 7 },
      { id_Product: 2, rating: 3 },
    ];
    validateDataErrorForReviews(allMockReviews); // check for Data Errors in fields of Reviews
    setTimeout(() => {
      if (Math.random() < 0.95) {
        // 2. Filter so it ONLY returns reviews matching this productId
        const filteredReviews = allMockReviews.filter(
          (review) => review.id_Product === productId,
        );

        // 3. Resolve with the filtered array instead of the whole list
        resolve(filteredReviews);
      } else {
        reject(`Failed to fetch reviews for product ID ${productId}`);
      }
    }, 1500);
  });
};

type SalesReport = {
  id_Product: number | null;
  totalSales: number | null;
  unitsSold: number | null;
  averagePrice: number | null;
};

const fetchSalesReport = (productId: number): Promise<SalesReport> => {
  return new Promise((resolve, reject) => {
    let mockReport = {
      // apply same mock data for each product
      id_Product: productId,
      totalSales: null,
      unitsSold: 30,
      averagePrice: 21,
    };
    validateDataErrorForSalesReport(mockReport); // check for Data Errors in fields of Sales Report
    setTimeout(() => {
      if (Math.random() < 0.95) {
        resolve(mockReport);
      } else {
        reject(`Failed to fetch sales report for ${productId}.`);
      }
    }, 1000);
  });
};

export default {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
};
