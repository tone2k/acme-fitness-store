import {useQuery} from '@tanstack/react-query';
import {getProduct, getProducts} from "../api/catalogClient.ts";
import {ProductData} from "../types/Catalog.ts";

export const useGetProducts = () => {
    return useQuery<{ data: ProductData[] }, Error>({
        queryKey: ['getProducts'],
        queryFn: getProducts,
    });
};

export const useGetProduct = (productId: string) => {
    return useQuery<{ data: ProductData }, Error>({
        queryKey: ['getProduct', productId],
        queryFn: () => getProduct(productId),
    });
};
