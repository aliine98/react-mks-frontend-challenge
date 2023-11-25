import styled from 'styled-components';
import { GetProducts } from '../api/products-service';
import Checkout from './Checkout';
import { useState } from 'react';
import { productData } from '../api/ProductData';
import Loading from './Loading';
import { BuyButton, Card, PriceTag, Wrapper } from './shared/styled-components';

const CartButton = styled.button`
    border-radius: 8px;
    background: #fff;
    border: none;
    padding: 6px 8px;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    font-weight: 700;
    align-items: center;
    position: fixed;
    top: 11px;
    right: 1rem;
    column-gap: 15px;
    cursor: pointer;
    z-index: 2;
`;

const ProductPhoto = styled.img`
    place-self: center;
`;

const ProductTile = styled.h4`
    color: #2c2c2c;
    display: inline-block;
    font-weight: 500;
`;

const P = styled.p`
    color: #2c2c2c;
    font-size: 12px;
    margin-bottom: 3.5rem;
`;

// const ProductCtxDefaultValue = {
//     products: [],
//     setProducts: () => {},
// };

// export const ProductsContext = createContext(ProductCtxDefaultValue);

export default function ProductCards() {
    const [selectedProducts, setSelectedProducts] = useState<productData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const productsInCart = selectedProducts?.length;

    function openCheckoutMenu() {
        setIsOpen(!isOpen);
    }

    const fetchProducts = GetProducts();
    if (fetchProducts.isPending) return <Loading />;
    if (fetchProducts.error) return 'Error';

    return (
        <>
            <CartButton onClick={openCheckoutMenu}>
                <img src='./cart.svg' alt='cart' />
                {productsInCart}
            </CartButton>
            <Checkout opened={isOpen} setOpened={setIsOpen} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
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
                    <BuyButton
                        onClick={() => {
                            if (selectedProducts?.includes(product)) return;
                            product.quantity = 1;
                            setSelectedProducts(selectedProducts?.concat(product));
                        }}>
                        <img src='./shopping-bag.svg' alt='shopping bag' />
                        Comprar
                    </BuyButton>
                </Card>
            ))}
        </>
    );
}
