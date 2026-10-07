type Product = {
  id: number;
  name: string;
  price: number;
};

type Review = {
  id_Product: number;
  rating: number;
};

type SalesReport = {
  id_Product: number | null;
  totalSales: number | null;
  unitsSold: number | null;
  averagePrice: number | null;
};

class DataError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function validateDataErrorForProducts(productsPassed: Product[]): void {
  productsPassed.forEach((product) => {
    if (product.id === null) {
      throw new DataError("Product id is missing, id was not provided");
    } else if (product.name === "") {
      throw new DataError("Product name is missing, name was not provided");
    } else if (product.price === null) {
      throw new DataError("Product price is missing, price was not provided");
    }
  });
}

export function validateDataErrorForReviews(reviewsPassed: Review[]) {
  reviewsPassed.forEach((review) => {
    if (review.id_Product === null) {
      throw new DataError("Review id is missing, id was not provided");
    } else if (review.rating === null) {
      throw new DataError("Review rating is missing, rating was not provided");
    }
  });
}

export function validateDataErrorForSalesReport(report: SalesReport) {
  if (report.id_Product === null) {
    throw new DataError("Sales Report id is missing, id was not provided");
  } else if (report.totalSales === null) {
    throw new DataError(
      "Sales Report total sales is missing, total sales was not provided",
    );
  } else if (report.unitsSold === null) {
    throw new DataError(
      "Sales Report units sold is missing, units sold were not provided",
    );
  } else if (report.averagePrice === null) {
    throw new DataError(
      "Sales Report average price is missing, average price were not provided",
    );
  }
}
