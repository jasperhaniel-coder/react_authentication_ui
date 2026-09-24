import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";
import AuthLayout from "../components/layout/AuthLayout";
import InputField from "../components/form/InputField";
import SubmitButton from "../components/form/SubmitButton";
import { requestPasswordReset } from "../services/authService";
import { isValidEmail } from "../utils/validators";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // After the request is successful, we don't move to another page immediately.
    // Instead, we change this flag and show a "check your email" message here.
    // This follows the assignment requirement to show a success message
    // before the user goes to enter the code.
    
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    if (!email) return setError("Email is required.");
    if (!isValidEmail(email)) return setError("Enter a valid email address.");
    setError("");

    setLoading(true);
    try {
      await requestPasswordReset({ email });
      setSubmitted(true);
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <AuthLayout title="Check your email">
        <div className="success-panel">
          <FaEnvelopeOpenText className="success-icon" />
          <h2>Reset code sent</h2>
          <p>We sent a 6-digit code to {email}. Enter it on the next screen.</p>
          <button
            className="btn btn-primary submit-btn"
            onClick={() => navigate("/verify-otp", { state: { email, context: "reset" } })}
          >
            Enter code
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we'll send you a reset code."
      footer={
        <Link to="/login" className="link-btn">
          Back to log in
        </Link>
      }
    >
      {formError && <div className="auth-alert auth-alert-error">{formError}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="forgot-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={error}
          autoFocus
        />
        <SubmitButton loading={loading}>Send reset code</SubmitButton>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
