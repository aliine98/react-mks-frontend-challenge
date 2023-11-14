import styled from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ProductsGrid = styled.ul`
    list-style: none;
    display: grid;
    gap: 1.5rem;
`;

function App() {
    return (
        <>
            <Header />
            <main>
                <ProductsGrid>
                    <QueryClientProvider client={queryClient}>
                        <ProductCard />
                    </QueryClientProvider>
                </ProductsGrid>
            </main>
            <Footer />
        </>
    );
}

export default App;

