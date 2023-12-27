import Footer from './components/Footer';
import Header from './components/Header';
import Store from './components/Store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductsGrid } from './components/shared/styled-components';

const queryClient = new QueryClient();
function App() {
    return (
        <>
            <Header />
            <main>
                <ProductsGrid>
                    <QueryClientProvider client={queryClient}>
                        <Store />
                    </QueryClientProvider>
                </ProductsGrid>
            </main>
            <Footer />
        </>
    );
}

export default App;

