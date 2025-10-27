import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const AuthButton = ({ className = '' }) => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-200 rounded h-10 w-20 ${className}`}></div>
    );
  }

  if (user) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <span className="text-sm text-gray-700 hidden sm:block">
          Welcome, {user?.user_metadata?.full_name || user?.email?.split('@')?.[0] || 'User'}
        </span>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Link to="/auth/login">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
      <Link to="/auth/signup">
        <Button size="sm">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default AuthButton;