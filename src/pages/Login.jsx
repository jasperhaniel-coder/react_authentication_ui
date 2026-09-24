import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import AuthLayout from "../components/layout/AuthLayout";
import InputField from "../components/form/InputField";
import PasswordField from "../components/form/PasswordField";
import SubmitButton from "../components/form/SubmitButton";
import { loginUser } from "../services/authService";
import { isValidEmail } from "../utils/validators";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Register.jsx and ResetPassword.jsx redirect hee after they are successfuland
  // They also send a short message to this page through router state, e.g. navigate("/login",
  // { state: { notice: "..." } }). We read and show that message when the page loads.

  const notice = location.state?.notice;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const nextErrors = {};
    if (!email) nextErrors.email = "Email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Password is required.";
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
      await loginUser({ email, password, rememberMe });
      navigate("/dashboard");
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Log in"
      subtitle="Welcome back. Enter your details to continue."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="link-btn">
            Create one
          </Link>
        </>
      }
    >
      {notice && (
        <div className="auth-alert auth-alert-success">
          <FaCheckCircle />
          <span>{notice}</span>
        </div>
      )}
      {formError && <div className="auth-alert auth-alert-error">{formError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="login-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
          autoFocus
        />
        <PasswordField
          id="login-password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          error={errors.password}
        />
        <div className="row-between">
          <label className="remember-check">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="link-btn">
            Forgot password?
          </Link>
        </div>
        <SubmitButton loading={loading}>Log in</SubmitButton>
      </form>
    </AuthLayout>
  );
}

export default Login;
