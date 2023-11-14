import styled from 'styled-components';
import { GetProducts } from '../api/products-service';
import { productData } from '../api/ProductData';

const Card = styled.li`
    padding: 10px 15px 0;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.14);
`;

export default function ProductCards() {
    const fetchProducts = GetProducts();
    if (fetchProducts.isPending) return 'Loading...';
    if (fetchProducts.error) return 'Error';

    return (
        <>
            {fetchProducts.data?.products.map((product: productData) => (
                <Card key={product.id}>
                    <img src={product.photo} alt='' width={130} height={160} />
                    <h2>
                        {product.brand} {product.name}
                    </h2>
                    <span>{product.price}</span>
                    <p>{product.description}</p>
                    <button>Comprar</button>
                </Card>
            ))}
        </>
    );
}
