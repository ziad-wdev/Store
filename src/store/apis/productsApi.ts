import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: "In Stock" | "Low Stock" | "Out of Stock";
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface DummyJsonResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetProductsParams {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<{ products: Product[]; totalPages: number }, GetProductsParams | void>({
      query: (params: GetProductsParams) => {
        const { category, page = 1, limit = 6, search } = params || {};

        if (category && search) {
          return { url: `products/category/${category}`, params: { limit: 100 } };
        }
        if (search) {
          return {
            url: "products/search",
            params: { q: search, limit, skip: (page - 1) * limit },
          };
        }
        if (category) {
          return {
            url: `products/category/${category}`,
            params: { limit, skip: (page - 1) * limit },
          };
        }
        return {
          url: "products",
          params: { limit, skip: (page - 1) * limit },
        };
      },
      transformResponse: (response: DummyJsonResponse, meta, arg: GetProductsParams) => {
        const { category, search, page = 1, limit = 6 } = arg || {};

        if (category && search) {
          const query = search.toLowerCase();

          const filteredResults = response.products.filter(
            (product) =>
              product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
          );

          const startIndex = (page - 1) * limit;
          return {
            products: filteredResults.slice(startIndex, startIndex + limit),
            totalPages: Math.ceil(filteredResults.length / limit),
          };
        }

        return {
          products: response.products,
          totalPages: Math.ceil(response.total / limit),
        };
      },
    }),

    getCategoryList: builder.query<Category[], void>({
      query: () => "products/categories",
    }),

    getDiscounts: builder.query<Product[], void>({
      query: () => "products?limit=100",
      transformResponse: (response: DummyJsonResponse) => {
        return response.products
          .filter((product) => product.discountPercentage >= 12)
          .sort((a, b) => b.discountPercentage - a.discountPercentage);
      },
    }),

    getNewArrivals: builder.query<Product[], void>({
      query: () => "products?limit=100",
      transformResponse: (response: DummyJsonResponse) => {
        return response.products.sort((a, b) => b.id - a.id);
      },
    }),

    getBestSellers: builder.query<Product[], void>({
      query: () => "products?limit=100",
      transformResponse: (response: DummyJsonResponse) => {
        return response.products.sort((a, b) => b.rating - a.rating);
      },
    }),

    getProductById: builder.query<Product, number>({
      query: (id: number) => `products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoryListQuery,
  useGetDiscountsQuery,
  useGetNewArrivalsQuery,
  useGetBestSellersQuery,
  useGetProductByIdQuery,
} = productsApi;
