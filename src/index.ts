// Write a Function to Handle API Calls and Display Data:

import apiFunctions from "./apiSimulator.js";

const { fetchProductCatalog, fetchProductReviews, fetchSalesReport } =
  apiFunctions;

// Chain these Promises together to simulate the flow

fetchProductCatalog()
  .then((products) => {
    console.log("--- Product Catalog Loaded ---");
    console.log(products);
    const reviewPromises = products.map((product) => {
      return fetchProductReviews(product.id);
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
      return fetchSalesReport(id); // return Review[]
    });
    return Promise.all(salesReportPromises);
  })
  .then((reports) => {
    console.log("--- Sales Report Loaded ---");
    console.log(reports);
  })
  .catch((error) => {
    console.error(" Caught an expected simulator error:", error);
  });
