import styled from 'styled-components';
import { GetProducts } from '../api/products-service';
import { productData } from '../api/ProductData';

const Card = styled.li`
    padding: 10px 15px 0;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.14);
    max-width: 250px;
    display: grid;
    position: relative;
`;

const ProductPhoto = styled.img`
    place-self: center;
`;

const ProductTile = styled.h4`
    color: #2c2c2c;
    display: inline-block;
    font-weight: 500;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.3rem;
`;

const PriceTag = styled.span`
    background: #373737;
    color: #fff;
    font-weight: 700;
    padding: 5px 7px;
    border-radius: 5px;
`;

const P = styled.p`
    color: #2c2c2c;
    font-size: 12px;
    margin-bottom: 3.5rem;
`;

const BuyButton = styled.button`
    position: absolute;
    inset: 90% 0 0;
    border: none;
    background: #0f52ba;
    color: #ffffff;
    border-radius: 0 0 8px 8px;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    cursor: pointer;
`;

export default function ProductCards() {
    const fetchProducts = GetProducts();
    if (fetchProducts.isPending) return 'Loading...';
    if (fetchProducts.error) return 'Error';

    return (
        <>
            {fetchProducts.data?.products.map((product: productData) => (
                <Card key={product.id}>
                    <ProductPhoto src={product.photo} alt='' width={160} height={150} />
                    <Wrapper>
                        <ProductTile>
                            {product.brand} {product.name}
                        </ProductTile>
                        <PriceTag>R${Number(product.price)}</PriceTag>
                    </Wrapper>
                    <P>{product.description}</P>
                    <BuyButton>
                        <img src='src/assets/shopping-bag.svg' alt='shopping bag' />
                        Comprar
                    </BuyButton>
                </Card>
            ))}
        </>
    );
}
