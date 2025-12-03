import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { register: registerUser } = useAuth(); // Rename to avoid conflict
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success('Registration Successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register('name', { required: true })}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
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
          <button
            type="submit"
            className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
