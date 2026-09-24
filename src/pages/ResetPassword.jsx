import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import AuthLayout from "../components/layout/AuthLayout";
import PasswordField from "../components/form/PasswordField";
import PasswordChecklist from "../components/form/PasswordChecklist";
import SubmitButton from "../components/form/SubmitButton";
import { resetPassword } from "../services/authService";
import { isPasswordValid } from "../utils/validators";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Same guard-clause idea as VerifyOtp.jsx: this page only makes
  // sense and works right after a verified OTP handed us an email, so if that
  // context is missing, send the user back to start the flow properly.
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  if (!email) return null;

  function validate() {
    const nextErrors = {};
    if (!isPasswordValid(password)) {
      nextErrors.password = "Password doesn't meet the requirements below.";
    }
    if (!confirmPassword) nextErrors.confirmPassword = "Confirm your new password.";
    else if (confirmPassword !== password) nextErrors.confirmPassword = "Passwords don't match.";
    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await resetPassword({ email, password });
      setSuccess(true);
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <AuthLayout title="Password updated">
        <div className="success-panel">
          <FaCheckCircle className="success-icon" />
          <h2>You're all set</h2>
          <p>Your password has been changed. Log in with your new password.</p>
          <button
            className="btn btn-primary submit-btn"
            onClick={() =>
              navigate("/login", { state: { notice: "Password updated. Please log in." } })
            }
          >
            Go to log in
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set a new password" subtitle={`Choose a new password for ${email}.`}>
      {formError && <div className="auth-alert auth-alert-error">{formError}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <PasswordField
          id="reset-password"
          label="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a new password"
          error={errors.password}
          autoFocus
        />
        <PasswordChecklist password={password} />
        <div className="mt-3">
          <PasswordField
            id="reset-confirm-password"
            label="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat your new password"
            error={errors.confirmPassword}
          />
        </div>
        <SubmitButton loading={loading}>Reset password</SubmitButton>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;