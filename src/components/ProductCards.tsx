import styled from 'styled-components';
import { GetProducts } from '../api/products-service';
import Checkout from './Checkout';
import { createContext, useState } from 'react';
import { productData } from '../api/ProductData';

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

const ProductCtxDefaultValue = {
    products: [],
    setProducts: () => {},
};

export const ProductsContext = createContext<{
    products: productData[] | [];
    setProducts: React.Dispatch<React.SetStateAction<[] | productData[]>>;
}>(ProductCtxDefaultValue);

export default function ProductCards() {
    const [selectedProducts, setSelectedProducts] = useState<productData[] | []>(ProductCtxDefaultValue.products);
    const value = { selectedProducts, setSelectedProducts };
    const [isOpen, setIsOpen] = useState(false);
    const productsInCart = selectedProducts.length;

    function openCheckoutMenu() {
        setIsOpen(!isOpen);
    }

    const fetchProducts = GetProducts();
    if (fetchProducts.isPending) return 'Loading...';
    if (fetchProducts.error) return 'Error';

    return (
        <>
            <ProductsContext.Provider value={value}>
                <CartButton onClick={openCheckoutMenu}>
                    <img src='/src/assets/cart.svg' alt='cart' />
                    {productsInCart}
                </CartButton>
                <Checkout opened={isOpen} setOpened={setIsOpen} />
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
                                if (selectedProducts.includes(product)) return;
                                product.quantity = 1;
                                setSelectedProducts(selectedProducts.concat(product));
                            }}>
                            <img src='src/assets/shopping-bag.svg' alt='shopping bag' />
                            Comprar
                        </BuyButton>
                    </Card>
                ))}
            </ProductsContext.Provider>
        </>
    );
}
