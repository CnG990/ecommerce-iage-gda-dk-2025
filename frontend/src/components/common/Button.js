import React from 'react';

const Button = ({
  children,
  type = 'button',
  className = '',
  loading = false,
  disabled = false,
  variant = 'primary',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center px-4 py-2 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline:
      'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="animate-spin mr-2 w-4 h-4 border-2 border-t-2 border-gray-200 border-t-primary-600 rounded-full"></span>
      ) : null}
      {children}
    </button>
  );
};

export default Button; 