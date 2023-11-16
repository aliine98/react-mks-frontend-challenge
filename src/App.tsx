import styled from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductCards from './components/ProductCards';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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

function App() {
    return (
        <>
            <Header />
            <main>
                <ProductsGrid>
                    <QueryClientProvider client={queryClient}>
                        <ProductCards />
                    </QueryClientProvider>
                </ProductsGrid>
            </main>
            <Footer />
        </>
    );
}

export default App;

