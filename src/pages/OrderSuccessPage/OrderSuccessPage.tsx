import { useNavigate, useParams } from 'react-router-dom';

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <div className="text-4xl">🎉</div>

      <h1 className="text-2xl font-semibold text-center">
        Thank you for your order!
      </h1>

      {orderId && (
        <p className="text-sm text-gray-600">
          Order ID: <b>{orderId}</b>
        </p>
      )}

      <div className="flex gap-4 mt-4">
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-black text-white rounded-lg">
          Go to Home
        </button>

        <button onClick={() => navigate('/catalog')} className="px-8 py-3 border border-black rounded-lg">
          Go to Catalog
        </button>
      </div>
    </div>
  );
};
