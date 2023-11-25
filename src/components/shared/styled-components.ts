import styled from 'styled-components';

export const ProductsGrid = styled.ul`
    list-style: none;
    padding: 0;
    max-width: 600px;
    display: grid;
    gap: 1.5rem;
    justify-items: center;
    margin: 1.2rem auto;
    @media screen and (min-width: 630px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
        max-width: 810px;
    }

    @media screen and (min-width: 1300px) {
        grid-template-columns: repeat(4, 1fr);
        max-width: 1000px;
    }
`;

export const Card = styled.li`
    padding: 10px 15px 0;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.14);
    max-width: 250px;
    display: grid;
    position: relative;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.3rem;
`;

export const BuyButton = styled.button`
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
    width: 100%;
`;

export const PriceTag = styled.span`
    background: #373737;
    color: #fff;
    font-weight: 700;
    padding: 5px 7px;
    border-radius: 5px;
    font-size: 15px;

    @media screen and (min-width: 500px) {
        &.checkout-price {
            background: none;
            color: #000;
            padding: 0;
            border-radius: 0;
            margin-left: 1rem;
        }
    }
`;
