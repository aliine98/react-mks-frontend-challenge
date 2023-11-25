import Skeleton from '@mui/material/Skeleton';
import { Card, Wrapper, BuyButton, ProductsGrid } from './shared/styled-components';

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
