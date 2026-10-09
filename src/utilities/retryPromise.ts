// To attempt Optional challenge

import apiFunctions from "../apiSimulator.js";

const { fetchProductCatalog, fetchProductReviews, fetchSalesReport } =
  apiFunctions;

type Product = {
  id: number;
  name: string;
  price: number;
};

// had to look up syntax for declaring type generics function
type asyncCallBackAll<T> = (id?: number) => Promise<T>;
// had to look up syntax for generics here

const retryPromise = async <T>(
  asyncCallBack: asyncCallBackAll<T>,
  attempts: number,
  delay: number,
): Promise<T> => {
  let currentTryCount = attempts;

  try {
    const apiCalled = await asyncCallBack();
    return apiCalled;
  } catch (error) {
    if (currentTryCount > 0) currentTryCount--;
    console.log(`${asyncCallBack} api failed.`, error);
    console.log("currentTryCount " + currentTryCount);
    if (currentTryCount <= 0) {
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delay)); // make a delay
    return retryPromise<T>(asyncCallBack, currentTryCount, delay); // recursive
  }
};

// Function call to retryPromise with 3 attempts for each api

retryPromise<Product[]>(fetchProductCatalog, 3, 1000)
  .then((products) => {
    console.log("--- Product Catalog Loaded ---");
    console.log(products);

    // Safety check: if products is undefined, return an empty array immediately
    // had to look up syntax for this block
    if (!products) return [];

    const reviewPromises = products.map((product) => {
      // Direct pass to retry engine immediately
      return retryPromise(() => fetchProductReviews(product.id), 3, 1000).catch(
        (err) => {
          // This catch block executes ONLY if all 3 retry attempts crash
          console.error(
            `All retry attempts failed for product ${product.id}:`,
            err,
          );
          return []; // Fallback array ensures Promise.all type resolves cleanly
        },
      );
    });

    return Promise.all(reviewPromises);
  })
  .then((productReviews) => {
    console.log("--- Product Reviews Loaded ---");
    console.log(productReviews);
    let allRIds: number[] = [];

    productReviews.forEach((reviewArray) => {
      reviewArray?.forEach((review) => {
        allRIds.push(review?.id_Product);
      });
    });

    const uniqueIds = [...new Set(allRIds)]; // Clean up duplicates so you only fetch the sales report once per product ID

    const salesReportPromises = uniqueIds.map((id) => {
      return retryPromise(() => fetchSalesReport(id), 3, 1000).catch((err) => {
        console.error("Failed to fetch sales report:", err);
        return [];
      });
    });
    return Promise.all(salesReportPromises);
  });
