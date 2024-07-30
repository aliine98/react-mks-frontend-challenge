import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { productData } from '../api/ProductData';
import { StoreContext } from './Store';
import CartItem from './CartItem';

const CheckoutMenu = styled.div`
    position: fixed;
    background: #0f52ba;
    inset: 0 0 0 auto;
    width: min(90%, 480px);
    z-index: 3;
    transform: translateX(100%);
    transition: transform 0.8s;
    color: #fff;
    padding: 0 0.8rem 2.4rem 2rem;
    text-align: center;

    &.open {
        transform: translateX(0);
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CheckoutTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
`;

const CloseButton = styled.button`
    padding: 8px 11px;
    background: #000;
    border: none;
    border-radius: 100%;
    cursor: pointer;
    display: grid;
    place-items: center;
    color: #fff;
`;

const CartList = styled.ul`
    overflow-y: scroll;
    height: 80%;
    padding: 0;
    list-style: none;
    display: grid;
    place-items: center;
    gap: 2rem;
    padding-top: 0.8rem;
`;

const TotalPrice = styled.h3`
    margin-right: 2rem;
`;

const CheckoutPurchaseButton = styled.button`
    position: absolute;
    inset: 92% 0 0;
    background-color: #000;
    color: #fff;
    border: none;
    font-size: 1.2rem;
    font-weight: 700;
    width: 100%;
`;

export default function Checkout() {
    const { state, dispatch } = useContext(StoreContext);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(state.productsPrices.reduce((acc: number, item: { id: number; price: number }) => acc + item?.price, 0));
    }, [state.selectedProducts, state.productsPrices]);

    return (
        <>
            <CheckoutMenu className={state.isOpen ? 'open' : ''}>
                <Wrapper>
                    <CheckoutTitle>Cart</CheckoutTitle>
                    <CloseButton onClick={() => dispatch({ type: 'openCloseCheckout' })}>X</CloseButton>
                </Wrapper>
                <CartList>
                    {state.selectedProducts?.map((product: productData) => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </CartList>
                <Wrapper>
                    <h3>Total:</h3>
                    <TotalPrice>${totalPrice}</TotalPrice>
                </Wrapper>
                <CheckoutPurchaseButton>Checkout</CheckoutPurchaseButton>
            </CheckoutMenu>
        </>
    );
}
