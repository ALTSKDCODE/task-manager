import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // 1. SINGLE SOURCE OF TRUTH: If user is logged in, go to dashboard.
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Login Successful!');
      // REMOVED navigate() here to prevent the infinite loop/race condition
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input 
              {...register('email', { required: true })} 
              className="w-full p-2 mt-1 border rounded" 
              type="email" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input 
              {...register('password', { required: true })} 
              className="w-full p-2 mt-1 border rounded" 
              type="password" 
            />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Sign In
          </button>
        </form>
        <p className="text-center">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;