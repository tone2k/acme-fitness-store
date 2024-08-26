import {useQuery} from '@tanstack/react-query';
import {getProduct, getProducts} from "../api/catalogClient.ts";
import {ProductData} from "../types/Catalog.ts";

export const useGetProducts = () =>  {

    const structure = {}
    
    
    structure['response'] = useQuery<ProductData[], Error>({
        queryKey: ['getProducts'],
        queryFn: getProducts,
    });

    return structure
};

export const useGetProduct = (productId: string) => {
    return useQuery<ProductData, Error>({
        queryKey: ['getProduct', productId],
        queryFn: () => getProduct(productId),
    });
};
