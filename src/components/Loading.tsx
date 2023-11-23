import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';

const ProductsGrid = styled.ul`
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

const Card = styled.li`
    padding: 10px 15px 0;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.14);
    max-width: 250px;
    display: grid;
    position: relative;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.3rem;
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

export default function Loading() {
    function getCards() {
        const cards = [];
        for (let i = 1; i <= 8; i++) {
            cards.push(
                <Card key={i}>
                    <Skeleton
                        variant='rectangular'
                        animation='wave'
                        width={160}
                        height={150}
                        style={{ placeSelf: 'center', marginBottom: '1.2rem' }}
                    />
                    <Wrapper style={{ marginBottom: '1rem' }}>
                        <Skeleton sx={{ fontSize: '1.6rem' }} width={110} animation='wave' />
                        <Skeleton variant='rounded' width={75} height={30} animation='wave' />
                    </Wrapper>
                    <Skeleton sx={{ fontSize: '12px' }} animation='wave' />
                    <Skeleton sx={{ fontSize: '12px' }} animation='wave' />
                    <Skeleton sx={{ fontSize: '12px' }} animation='wave' style={{ marginBottom: '3.5rem' }} />
                    <BuyButton>
                        <img src='./shopping-bag.svg' alt='shopping bag' />
                        Comprar
                    </BuyButton>
                </Card>
            );
        }
        return cards;
    }

    return (
        <>
            <ProductsGrid>{getCards()}</ProductsGrid>
        </>
    );
}
