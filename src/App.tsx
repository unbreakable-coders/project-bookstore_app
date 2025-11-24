import { Routes, Route } from 'react-router-dom';

import { AppLayout } from './components/templates/AppLayout';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { BookDetailsPage } from './pages/BookDetailsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutFormPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { ContactsPage } from './pages/system/ContactsPage';
import { PageNotFound } from './pages/NotFoundPage';
import DevPreviewPage from './pages/DevPreviewPage';
import { GithubPage } from './pages/system/GithubPage';
import { RightsPage } from './pages/system/RightsPage';
//import { RegisterPage } from './pages/RegisterPage';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { MoveHeartProvider } from './components/MoveHeart';
import { MoveBookToCartProvider } from './components/MoveBookToCart';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <MoveHeartProvider>
            <MoveBookToCartProvider>
              <ScrollToTop />

              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="catalog" element={<CatalogPage />} />
                  <Route path="catalog/:bookType" element={<CatalogPage />} />
                  <Route
                    path="books/:namespaceId"
                    element={<BookDetailsPage />}
                  />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contacts" element={<ContactsPage />} />
                  <Route path="login" element={<LoginPage />} />
                  {/* <Route path="register" element={<RegisterPage />} /> */}
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="github" element={<GithubPage />} />
                  <Route path="rights" element={<RightsPage />} />
                  <Route path="dev/preview" element={<DevPreviewPage />} />
                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
            </MoveBookToCartProvider>
          </MoveHeartProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
