import { Routes, Route } from 'react-router-dom';

import { AppLayout } from './components/templates/AppLayout';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { BookDetailsPage } from './pages/BookDetailsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PageNotFound } from './pages/NotFoundPage';
import DevPreviewPage from './pages/DevPreviewPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* HOME — index */}
        <Route index element={<HomePage />} />

        {/* MAIN ROUTES */}
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="books/:bookId" element={<BookDetailsPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* DEV */}
        <Route path="dev/preview" element={<DevPreviewPage />} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
