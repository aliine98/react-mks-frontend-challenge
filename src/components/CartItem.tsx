import styled from 'styled-components';
import { Wrapper, PriceTag } from './shared/styled-components';
import { productData } from '../api/ProductData';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from './Store';

const CartProduct = styled.li`
    background-color: #fff;
    padding: 10px;
    color: #2c2c2c;
    width: 80%;
    border-radius: 8px;
    position: relative;

    @media screen and (min-width: 500px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;

        img {
            width: 70px;
            height: 70px;
        }
    }
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

    @media screen and (min-width: 500px) {
        width: 100px;
    }
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

    @media screen and (min-width: 500px) {
        width: 25px;
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

    @media screen and (min-width: 500px) {
        width: 25px;
    }
`;

export default function CartItem({product}:{product: productData}) {
    const {dispatch} = useContext(StoreContext);
    const [productQty, setProductQty] = useState(1);

    useEffect(() => dispatch({type:'updateProductsQty',newQty:{id:product.id,price:Number(product.price) * productQty}}),[productQty]);

    return (
        <>
            <CartProduct>
                <DeleteButton onClick={() => dispatch({ type: 'deleteProduct', product: product })}>X</DeleteButton>
                <img src={product.photo} width='90' height='90' alt={product.name} />
                <Title>
                    {product.brand} {product.name}
                </Title>
                <Wrapper>
                    <div>
                        <QuantityButton
                            className='minus'
                            onClick={() => {
                                setProductQty((productQty) => productQty - 1);
                            }}>
                            -
                        </QuantityButton>
                        <QuantityInput
                            type='number'
                            value={productQty}
                            onChange={e => {
                                setProductQty(Number(e.target.value));
                            }}
                            min='1'
                        />
                        <QuantityButton
                            className='plus'
                            onClick={() => {
                                setProductQty((productQty) => productQty + 1);
                            }}>
                            +
                        </QuantityButton>
                    </div>
                    <PriceTag className='checkout-price'>R${Number(product.price) * productQty}</PriceTag>
                </Wrapper>
            </CartProduct>
        </>
    );
}
