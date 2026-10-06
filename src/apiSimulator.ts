/*
Each function should return a Promise that resolves with mock data after a delay, or rejects with an error message.
*/

type Product = {
  id: number;
  name: string;
  price: number;
};

const fetchProductCatalog = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.95) {
        resolve([
          { id: 1, name: "Laptop", price: 1200 },
          { id: 2, name: "Headphones", price: 200 },
          { id: 2, name: "Shoes", price: 300 },
        ]);
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
    setTimeout(() => {
      if (Math.random() < 0.95) {
        const allMockReviews = [
          { id_Product: 1, rating: 3 },
          { id_Product: 1, rating: 5 },
          { id_Product: 1, rating: 6 },
          { id_Product: 2, rating: 8 },
          { id_Product: 2, rating: 7 },
          { id_Product: 2, rating: 3 },
        ];
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
  id_Product: number;
  totalSales: number;
  unitsSold: number;
  averagePrice: number;
};

const fetchSalesReport = (productId: number): Promise<SalesReport> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.95) {
        resolve({
          // apply same mock data for each product
          id_Product: productId,
          totalSales: 20000,
          unitsSold: 30,
          averagePrice: 21,
        });
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
