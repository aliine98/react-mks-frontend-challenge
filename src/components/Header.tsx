import React from 'react';
import styled from 'styled-components';

export default function Header() {
    const cartItensNumber: number = 0;
    const Header = styled.header`
        background-color: #0f52ba;
        padding: 11px 20px;
        position: sticky;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const CartButton = styled.button`
        border-radius: 8px;
        background: #fff;
        border: none;
        padding: 6px 8px;
        font-family: 'Montserrat', sans-serif;
        display: flex;
        font-weight: 700;
        align-items: center;
        column-gap: 15px;
    `;

    return (
        <>
            <Header>
                <img src='/src/assets/logo.svg' alt='MKS Sistemas logo' />
                <CartButton>
                    <img src='/src/assets/cart.svg' alt='cart' />
                    {cartItensNumber}
                </CartButton>
            </Header>
        </>
    );
}
