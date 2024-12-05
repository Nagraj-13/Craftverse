import React from 'react';
import { AuthFormComponent } from './auth-form';

const AuthPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {/* Container for the content */}
      <div className="flex flex-col items-center justify-center text-center p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to BizCraft</h1>
          <p className="text-gray-600">Please log in to access your account or register if you're new here.</p>
        </div>
          <AuthFormComponent />
      </div>
    </div>
  );
};

export default AuthPage;
