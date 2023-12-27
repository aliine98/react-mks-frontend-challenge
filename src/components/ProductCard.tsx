import styled from "styled-components";
import { productData } from "../api/ProductData";
import { BuyButton, Card, PriceTag, Wrapper } from "./shared/styled-components";
import { useContext } from "react";
import { StoreContext } from "./Store";

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

export default function ProductCard({product}:{product:productData}) {
    const {state,dispatch} = useContext(StoreContext);
    return (
        <>
            <Card>
                <ProductPhoto src={product.photo} alt={product.name} width={160} height={150} />
                <Wrapper>
                    <ProductTile>
                        {product.brand} {product.name}
                    </ProductTile>
                    <PriceTag>R${Number(product.price)}</PriceTag>
                </Wrapper>
                <P>{product.description}</P>
                <BuyButton
                onClick={() => {
                    if (state.selectedProducts.includes(product)) return;
                    dispatch({type:'addProduct',product:product});
                    dispatch({type:'updateProductsPrices',newPrice: {id: product.id, price: Number(product.price)}});
                }}>
                    <img src='./shopping-bag.svg' alt='shopping bag' />
                    Comprar
                </BuyButton>
            </Card>
        </>
    )
}
