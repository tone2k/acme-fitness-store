import axios from 'axios';
import {ProductData} from "../types/Catalog.ts";

export const getProducts = async (): Promise<{ data: ProductData[] }> => {
    const response = await axios.get<{ data: ProductData[] }>('/products');
    return response.data;
};

export const getProduct = async (productId: string): Promise<{ data: ProductData}> => {
    const response = await axios.get<{ data: ProductData}>(`/products/${productId}`);
    return response.data;
};
