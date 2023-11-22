import React, { useContext, useState } from 'react';
import { styled } from 'styled-components';
import { ProductsContext } from './ProductCards';
import { productData } from '../api/ProductData';

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

const CartProduct = styled.li`
    background-color: #fff;
    padding: 10px;
    color: #2c2c2c;
    width: 80%;
    border-radius: 8px;
    position: relative;
`;

const DeleteButton = styled.button`
    background-color: #000;
    color: #fff;
    padding: 7px 10px;
    border: none;
    border-radius: 100%;
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
`;

const Title = styled.h5`
    font-weight: 500;
`;

const QuantityInput = styled.input`
    border-top: 1px solid #bfbfbf;
    border-bottom: 1px solid #bfbfbf;
    border-right: none;
    border-left: none;
    width: 30px;
    padding: 5px;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
`;

const QuantityButton = styled.button`
    border-top: 1px solid #bfbfbf;
    border-bottom: 1px solid #bfbfbf;
    padding: 5px;
    border-radius: 4px;
    background: none;
    width: 30px;
    cursor: pointer;

    &.minus {
        border-left: 1px solid #bfbfbf;
        border-right: none;
    }
    &.plus {
        border-right: 1px solid #bfbfbf;
        border-left: none;
    }
`;

const PriceTag = styled.span`
    background: #373737;
    color: #fff;
    font-weight: 700;
    padding: 5px 7px;
    border-radius: 5px;
    font-size: 700;
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
`;

type CheckoutProps = {
    opened?: boolean;
    setOpened?: React.Dispatch<React.SetStateAction<boolean>>;
    // products: productData[];
    // setProducts?: React.Dispatch<React.SetStateAction<productData[]>>;
};

export default function Checkout({ opened, setOpened }: CheckoutProps) {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
    const [, setProductQuantity] = useState(1);
    const totalPrice = selectedProducts?.reduce((acc: number, p: productData) => acc + p.price * p.quantity, 0);

    return (
        <>
            <CheckoutMenu className={opened ? 'open' : ''}>
                <Wrapper>
                    <CheckoutTitle>Carrinho de compras</CheckoutTitle>
                    <CloseButton onClick={() => setOpened!(!opened)}>X</CloseButton>
                </Wrapper>
                <CartList>
                    {selectedProducts?.map((product: productData, index: number) => (
                        <CartProduct key={index}>
                            <DeleteButton onClick={() => setSelectedProducts!(selectedProducts?.filter((p: productData) => p != product))}>
                                X
                            </DeleteButton>
                            <img src={product.photo} width='80' height='90' alt={product.name} />
                            <Title>
                                {product.brand} {product.name}
                            </Title>
                            <Wrapper>
                                <div>
                                    <QuantityButton
                                        className='minus'
                                        onClick={() => {
                                            product.quantity -= 1;
                                            setProductQuantity(product.quantity - 1);
                                        }}>
                                        -
                                    </QuantityButton>
                                    <QuantityInput
                                        type='number'
                                        value={product.quantity}
                                        onChange={e => {
                                            setProductQuantity(Number(e.target.value));
                                            product.quantity = Number(e.target.value);
                                        }}
                                        min='1'
                                    />
                                    <QuantityButton
                                        className='plus'
                                        onClick={() => {
                                            product.quantity += 1;
                                            setProductQuantity(product.quantity + 1);
                                        }}>
                                        +
                                    </QuantityButton>
                                </div>
                                <PriceTag>R${Number(product.price) * product.quantity}</PriceTag>
                            </Wrapper>
                        </CartProduct>
                    ))}
                </CartList>
                <Wrapper>
                    <h3>Total:</h3>
                    <TotalPrice>R${totalPrice}</TotalPrice>
                </Wrapper>
                <CheckoutPurchaseButton>Finalizar Compra</CheckoutPurchaseButton>
            </CheckoutMenu>
        </>
    );
}
