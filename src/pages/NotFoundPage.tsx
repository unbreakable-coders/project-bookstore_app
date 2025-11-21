import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/atoms/Icon/Icon';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-gray-200 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">📖</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 mb-8">
          It seems that this page has been sent to the library and has not
          returned.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="flex justify-center items-center">
              <Icon name="homeWhite" className="inline-block w-4 h-4 mr-2" />
              Back to home page
            </div>
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="block w-full bg-white text-black border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Icon name="arrowLeft" className="inline-block w-4 h-4 mr-2" />
            Go back
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          If the problem persists, please contact us.
        </p>
      </div>
    </div>
  );
};
