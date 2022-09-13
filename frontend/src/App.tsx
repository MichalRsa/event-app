import Nav from './components/Nav';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  return (
    <div className='w-full min-h-screen flex flex-col bg-gray-50'>
      <Nav />
      <div className='max-w-screen-lg w-2/3 mx-auto  grow'>
        <Main />
      </div>

      <Footer />
    </div>
  );
}

export default App;
