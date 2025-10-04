import { useEffect } from 'react';

const PromptPassword = () => {
  useEffect(() => {
    const { ApperUI } = window.ApperSDK;
    ApperUI.showPromptPassword('#authentication-prompt-password');
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div id="authentication-prompt-password" className="bg-white mx-auto w-[400px] max-w-full p-10 rounded-2xl shadow-xl"></div>
    </div>
  );
};

export default PromptPassword;