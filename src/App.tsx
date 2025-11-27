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
import { GitHubPage } from './pages/system/GithubPage';
import { RightsPage } from './pages/system/RightsPage';

import { MockStripeCheckout } from './pages/MockStripeCheckout/MockStripeCheckout';
import { OrderSuccessPage } from './pages/OrderSuccessPage/OrderSuccessPage';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { MoveHeartProvider } from './components/MoveHeart';
import { MoveBookToCartProvider } from './components/MoveBookToCart';
import { WelcomeDiscountProvider } from './context/WelcomeDiscountContext';
import { WelcomeDiscountModal } from './components/organisms/WelcomeDiscountModal';
import { ThemedBackground } from './components/organisms/ThemedBackground';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <MoveHeartProvider>
            <MoveBookToCartProvider>
              <WelcomeDiscountProvider>
                <ScrollToTop />
                <WelcomeDiscountModal />
                <ThemedBackground />

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
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="github" element={<GitHubPage />} />
                    <Route path="rights" element={<RightsPage />} />
                    <Route path="dev-preview" element={<DevPreviewPage />} />

                    <Route
                      path="mock-stripe-checkout"
                      element={<MockStripeCheckout />}
                    />
                    <Route
                      path="mock-checkout"
                      element={<MockStripeCheckout />}
                    />

                    <Route
                      path="order-success"
                      element={<OrderSuccessPage />}
                    />

                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                </Routes>
              </WelcomeDiscountProvider>
            </MoveBookToCartProvider>
          </MoveHeartProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
