import { useQuery } from '@tanstack/react-query';

export function GetProducts() {
    const { isPending, error, data } = useQuery({
        queryKey: ['productsData'],
        queryFn: () =>
            fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products/?page=1&rows=20&sortBy=id&orderBy=ASC').then(res =>
                res.json()
            ),
    });

    return { isPending, error, data };
}
