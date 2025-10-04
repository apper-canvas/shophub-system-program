import { useSearchParams, Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An error occurred';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={32} className="text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-700 mb-6">{errorMessage}</p>
        <Link to="/login" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;