import styled from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductCard from './components/ProductCard';

function App() {
    const ProductsGrid = styled.ul`
        list-style: none;
        display: grid;
        gap: 1.5rem;
    `;

    return (
        <>
            <Header />
            <main>
                <ProductsGrid>
                    <ProductCard />
                </ProductsGrid>
            </main>
            <Footer />
        </>
    );
}

export default App;

