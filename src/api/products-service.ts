import { useQuery } from '@tanstack/react-query';

export function GetProducts() {
    const { isPending, error, data } = useQuery({
        queryKey: ['productsData'],
        queryFn: () => fetch('https://fakestoreapi.com/products').then(res => res.json()),
    });

    return { isPending, error, data };
}
