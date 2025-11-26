import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from '@/components/atoms/Icon';
import i18n from 'i18next';
import { defaultOptions } from './toastOptions';

export const toastWishlistAdded = () =>
  toast.success(
    <div className="flex items-center">
      <Icon name="heartRed" className="w-6 h-6 mr-2" />
      {i18n.t('Book added to favorites')}
    </div>,
    { ...defaultOptions, autoClose: 2500 },
  );

export const toastWishlistRemoved = () =>
  toast.info(
    <div className="flex items-center">
      <Icon name="heart" className="w-6 h-6 mr-2 text-gray-400" />
      {i18n.t('Book removed from favorites')}
    </div>,
    { ...defaultOptions, autoClose: 2000 },
  );

export const toastCartAdded = () =>
  toast.success(
    <div className="flex items-center">
      <Icon name="cart" className="w-6 h-6 mr-2" />
      {i18n.t('Book added to cart')}
    </div>,
    { ...defaultOptions, autoClose: 2500 },
  );

export const toastCartRemoved = () =>
  toast.info(
    <div className="flex items-center">
      <Icon name="cart" className="w-6 h-6 mr-2 text-gray-400" />
      {i18n.t('Book removed from cart')}
    </div>,
    { ...defaultOptions, autoClose: 2000 },
  );

export const ToastsContainer = () => (
  <ToastContainer
    position="bottom-right"
    autoClose={3000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    limit={3}
  />
);
