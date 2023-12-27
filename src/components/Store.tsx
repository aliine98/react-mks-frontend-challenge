import styled from 'styled-components';
import { GetProducts } from '../api/products-service';
import Checkout from './Checkout';
import { createContext, useReducer } from 'react';
import { productData } from '../api/ProductData';
import Loading from './Loading';
import ProductCard from './ProductCard'

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

const StoreInitialState = {
    selectedProducts: [],
    isOpen: false,
    productsQty: [],
};

type StoreCtx = {
    selectedProducts: productData[];
    isOpen: boolean;
    productsQty: {id:number;price:number}[];
}

type Action =
 | { type: 'addProduct',product: productData }
 | { type: 'openCloseCheckout'}
 | {type: 'deleteProduct', product: productData}
 | {type: 'updateProductsQty',newQty: {id:number;price:number}};

export const StoreContext = createContext<{state:StoreCtx,dispatch: React.Dispatch<Action>}>({state:StoreInitialState, dispatch: () => {}});

function reducer(state: StoreCtx, action: Action) {
    switch (action.type) {
        case 'addProduct':
            return {...state,
                selectedProducts: state.selectedProducts.concat(action.product)
            };
        case 'openCloseCheckout':
            return {...state,
                isOpen: !state.isOpen
            };
        case 'deleteProduct':
            return {...state,
                selectedProducts: state.selectedProducts.filter((p: productData) => p != action.product)
            };
        case 'updateProductsQty':
            if(state.productsQty.every(p => p.id !== action.newQty.id)) {
                return {...state,productsQty: [...state.productsQty,action.newQty]};
            }
            state.productsQty.map((product:{id:number,price:number}) => {
                if(product.id === action.newQty.id) {
                    // Object.defineProperty(product,'price',{value:action.newQty.price});
                    product.price = action.newQty.price;
                }
            });
            return {...state,productsQty: [...state.productsQty]};
    }
}

export default function Store() {
    const [state,dispatch] = useReducer(reducer,StoreInitialState);
    const productsInCart = state.selectedProducts?.length;

    function openCheckoutMenu() {
        dispatch({type: 'openCloseCheckout'});
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
            <StoreContext.Provider value={{state,dispatch}}>
                <Checkout />
                {fetchProducts.data?.products.map((product: productData) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </StoreContext.Provider>
        </>
    );
}
