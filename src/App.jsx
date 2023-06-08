import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { CartNotFound } from './pages/CartNotFound';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import './scss/app.scss';
import Pizza from './pages/Pizza';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="*" element={<CartNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
