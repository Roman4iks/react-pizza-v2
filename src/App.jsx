import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { CartNotFound } from './pages/CartNotFound';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import './scss/app.scss';
import { createContext, useState } from 'react';

export const SeacrhContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SeacrhContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<CartNotFound />} />
          </Routes>
        </div>
      </SeacrhContext.Provider>
    </div>
  );
}

export default App;
