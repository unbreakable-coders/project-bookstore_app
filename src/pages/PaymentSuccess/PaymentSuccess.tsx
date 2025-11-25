import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

type Status = 'processing' | 'success';

export const PaymentSuccess = () => {
  const [status, setStatus] = useState<Status>('processing');
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = params.get('session_id');
  const amount = params.get('amount');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToCatalog = () => {
    navigate('/catalog');
  };

  if (status === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <h2 className="text-2xl font-semibold">Processing payment...</h2>
        <p className="text-gray-600">
          Please wait a moment while we confirm your payment.
        </p>
        {amount && (
          <p className="text-gray-500 text-sm">
            Amount: <b>{amount}₴</b>
          </p>
        )}
        {sessionId && (
          <p className="text-gray-400 text-xs">Session ID: {sessionId}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <div className="text-3xl">✅</div>

      <h2 className="text-2xl font-semibold">Payment successful</h2>

      <div className="text-center text-gray-700 space-y-1">
        {amount && (
          <p>
            Thank you for your purchase of <b>{amount}₴</b>.
          </p>
        )}
        <p>Your payment has been confirmed.</p>
      </div>

      {sessionId && (
        <p className="text-gray-400 text-xs">Session ID: {sessionId}</p>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={handleGoHome}
          className="px-8 py-3 bg-black text-white rounded-lg hover:scale-105 hover:shadow-xl shadow-stone-700 transition duration-300"
        >
          Go to Home
        </button>

        <button
          type="button"
          onClick={handleGoToCatalog}
          className="px-8 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition duration-300"
        >
          Go to Catalog
        </button>
      </div>
    </div>
  );
};
