

import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';

const AuthModal = ({ isOpen, onClose, defaultTab = 'login', onAuthSuccess }) => {
  const { login, register } = useData();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    confirmPassword: ''
  });

  // Reset errors when tab changes
  useEffect(() => {
    setError('');
    setFormErrors({});
  }, [activeTab]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    // Common validations
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.password) errors.password = 'Password is required';
    
    // Registration specific validations
    if (activeTab === 'signup') {
      if (!formData.first_name.trim()) errors.first_name = 'First name is required';
      if (!formData.last_name.trim()) errors.last_name = 'Last name is required';
      if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (activeTab === 'login') {
        // Handle login
        const result = await login({
          email: formData.email,
          password: formData.password
        });
        
        if (result.success) {
          toast.success('Login successful!');
          onAuthSuccess?.();
          onClose();
        }
      } else {
        // Handle registration
        const { confirmPassword, ...registrationData } = formData;
        await register(registrationData);
        
        // Auto-login after registration
        const loginResult = await login({
          email: formData.email,
          password: formData.password
        });

        if (loginResult.success) {
          toast.success('Registration and login successful!');
          onAuthSuccess?.();
          onClose();
        }
      }
    } catch (error) {
      setError(error.message || 
        (activeTab === 'login' ? 'Login failed' : 'Registration failed'));
      
      // Switch to login if email exists
      if (error.message.includes('already exists')) {
        setActiveTab('login');
        setFormData(prev => ({ ...prev, password: '' }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        <div className="flex border-b">
          <button
            className={`flex-1 py-3 font-medium ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-medium ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('signup')}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            {activeTab === 'login' ? 'Login' : 'Create Account'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.first_name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.first_name}</p>
                    )}
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.last_name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.last_name}</p>
                    )}
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                )}
              </label>
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                  )}
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {activeTab === 'login' ? 'Logging in...' : 'Registering...'}
                </span>
              ) : (
                activeTab === 'login' ? 'Login' : 'Register'
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button 
              onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {activeTab === 'login' 
                ? "Don't have an account? Register" 
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;