import styled from 'styled-components';
import { GetProducts } from '../api/products-service';
import Checkout from './Checkout';
import { createContext, useReducer } from 'react';
import { productData } from '../api/ProductData';
import Loading from './Loading';
import ProductCard from './ProductCard';

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

type StoreCtx = {
    selectedProducts: productData[];
    isOpen: boolean;
    productsPrices: { id: number; price: number }[];
};

const StoreInitialState: StoreCtx = {
    selectedProducts: [],
    isOpen: false,
    productsPrices: [],
};

type Action =
    | { type: 'addProduct'; product: productData }
    | { type: 'openCloseCheckout' }
    | { type: 'deleteProduct'; product: productData }
    | { type: 'updateProductsPrices'; newPrice: { id: number; price: number } }
    | { type: 'deleteProductPrice'; product: productData };

export const StoreContext = createContext<{ state: StoreCtx; dispatch: React.Dispatch<Action> }>({ state: StoreInitialState, dispatch: () => {} });

function reducer(state: StoreCtx, action: Action): StoreCtx {
    switch (action.type) {
        case 'addProduct': {
            return { ...state, selectedProducts: state.selectedProducts.concat(action.product) };
        }
        case 'openCloseCheckout': {
            return { ...state, isOpen: !state.isOpen };
        }
        case 'deleteProduct': {
            return { ...state, selectedProducts: state.selectedProducts.filter((p: productData) => p != action.product) };
        }
        case 'updateProductsPrices': {
            if (state.productsPrices.every(p => p.id !== action.newPrice.id)) {
                return { ...state, productsPrices: [...state.productsPrices, action.newPrice] };
            }
            state.productsPrices.map((product: { id: number; price: number }) => {
                if (product.id === action.newPrice.id) {
                    // Object.defineProperty(product,'price',{value:action.newPrice.price});
                    product.price = action.newPrice.price;
                }
            });
            return { ...state, productsPrices: [...state.productsPrices] };
        }
        case 'deleteProductPrice': {
            return { ...state, productsPrices: state.productsPrices.filter(price => price.id != action.product.id) };
        }
    }
}

export default function Store() {
    const [state, dispatch] = useReducer(reducer, StoreInitialState);
    const productsInCart = state.selectedProducts?.length;

    const fetchProducts = GetProducts();
    if (fetchProducts.isPending) return <Loading />;
    if (fetchProducts.error) return 'Error';

    return (
        <>
            <CartButton onClick={() => dispatch({ type: 'openCloseCheckout' })}>
                <img src='./cart.svg' alt='cart' />
                {productsInCart}
            </CartButton>
            <StoreContext.Provider value={{ state, dispatch }}>
                <Checkout />
                {fetchProducts.data?.map((product: productData) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </StoreContext.Provider>
        </>
    );
}
