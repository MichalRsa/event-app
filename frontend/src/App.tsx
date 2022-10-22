import Nav from './layouts/Nav';
import Footer from './layouts/Footer';
import Main from './views/Main';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full min-h-screen flex flex-col bg-gray-50'>
        <Nav />
        <div className='max-w-screen-lg w-2/3 mx-auto  grow'>
          <Main />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
