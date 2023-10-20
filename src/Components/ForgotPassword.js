import React, { useState } from 'react';
import ConfirmEmail from './ConfirmEmail';
import ResetPassword from './ResetPassword';


export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // Step 1: Confirm Email, Step 2: Reset Password

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="forgot-password-page">
      {step === 1 ? (
        <ConfirmEmail onNext={handleNextStep} />
      ) : step === 2 ? (
        <ResetPassword onReset={handleNextStep} />
      ) : null}
    </div>
  );
}
