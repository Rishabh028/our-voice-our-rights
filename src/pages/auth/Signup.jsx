import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';

const Signup = () => {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e?.target?.name]: e?.target?.value
    }));
    if (error) setError('');
    if (message) setMessage('');
  };

  const validateForm = () => {
    if (!formData?.email?.trim() || !formData?.password?.trim() || 
        !formData?.confirmPassword?.trim() || !formData?.fullName?.trim()) {
      setError('Please fill in all required fields');
      return false;
    }

    if (formData?.password !== formData?.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData?.password?.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone || null
          }
        }
      });

      if (signUpError) throw signUpError;

      if (data?.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: data.user.id,
              full_name: formData.fullName,
              email: formData.email,
              phone: formData.phone || null
            }
          ]);

        if (profileError) throw profileError;

        setMessage('Registration successful! Please check your email to verify your account.');
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      }
    } catch (error) {
      setError(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData?.fullName || ''}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData?.email || ''}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData?.phone || ''}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter your phone number"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData?.password || ''}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter your password (min 6 characters)"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData?.confirmPassword || ''}
                onChange={handleChange}
                className="mt-1"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {message && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{message}</div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>

          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;