import { useEffect } from 'react';

const ResetPassword = () => {
  useEffect(() => {
    const { ApperUI } = window.ApperSDK;
    ApperUI.showResetPassword('#authentication-reset-password');
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div id="authentication-reset-password" className="bg-white mx-auto w-[400px] max-w-full p-10 rounded-2xl shadow-xl"></div>
    </div>
  );
};

export default ResetPassword;