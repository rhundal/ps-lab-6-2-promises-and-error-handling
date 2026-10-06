// Write a Function to Handle API Calls and Display Data:

import apiFunctions from "./apiSimulator.js";

const { fetchProductCatalog, fetchProductReviews, fetchSalesReport } =
  apiFunctions;

// Chain these Promises together to simulate the flow

fetchProductCatalog()
  .catch((err) => {
    // catch for fetchProductCatalog()
    console.log("Failed to fetch Product Catalog", err);
    throw err;
  })
  .then((products) => {
    console.log("--- Product Catalog Loaded ---");
    console.log(products);
    const reviewPromises = products.map((product) => {
      return fetchProductReviews(product.id).catch((err) => {
        // catch for fetchProductReviews()
        console.error("Failed to fetch product reviews:", err);
        return [];
      });
    });
    return Promise.all(reviewPromises);
  })
  .then((productReviews) => {
    console.log("--- Product Reviews Loaded ---");
    console.log(productReviews);
    let allRIds: number[] = [];

    productReviews.forEach((reviewArray) => {
      reviewArray.forEach((review) => {
        allRIds.push(review.id_Product);
      });
    });

    const uniqueIds = [...new Set(allRIds)]; // Clean up duplicates so you only fetch the sales report once per product ID

    const salesReportPromises = uniqueIds.map((id) => {
      return fetchSalesReport(id).catch((err) => {
        console.error("Failed to fetch sales report:", err);
        return [];
      }); // return Review[]
    });
    return Promise.all(salesReportPromises);
  })
  .then((reports) => {
    console.log("--- Sales Report Loaded ---");
    console.log(reports);
  })
  .catch((error) => {
    console.error(" Caught an expected simulator error:", error);
  })
  .finally(() => {
    console.log("All API Calls have been attempted");
  });
