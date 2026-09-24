import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import InputField from "../components/form/InputField";
import PasswordField from "../components/form/PasswordField";
import PasswordChecklist from "../components/form/PasswordChecklist";
import SubmitButton from "../components/form/SubmitButton";
import { registerUser } from "../services/authService";
import { isValidEmail, isPasswordValid } from "../utils/validators";

const Register = () => {
  const navigate = useNavigate();


  // Used one object to store the values of all four input fields.
  // update() changes only the field we want and keeps the other values.
  // The ...form (spread) helps us keep the existing values.

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!form.email) nextErrors.email = "Email is required.";
    else if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!isPasswordValid(form.password)) {
      nextErrors.password = "Password doesn't meet the requirements below.";
    }
    if (!form.confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
    else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords don't match.";
    }
    if (!form.agreeToTerms) nextErrors.agreeToTerms = "You must accept the terms to continue.";
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
      await registerUser(form);
   // This sends the email and context to the OTP page.
      // The context tells the page why the user is entering the code,
      // which is for verifying a brand-new account as opposed to a password reset, which uses the same page.

      navigate("/verify-otp", { state: { email: form.email, context: "register" } });
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Sign up in a couple of minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="link-btn">
            Log in
          </Link>
        </>
      }
    >
      {formError && <div className="auth-alert auth-alert-error">{formError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="reg-name"
          label="Full name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Jane Doe"
          error={errors.name}
          autoFocus
        />
        <InputField
          id="reg-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />
        <PasswordField
          id="reg-password"
          label="Password"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          placeholder="Create a password"
          error={errors.password}
        />
        <PasswordChecklist password={form.password} />
        <div className="mt-3">
          <PasswordField
            id="reg-confirm-password"
            label="Confirm password"
            value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
            placeholder="Repeat your password"
            error={errors.confirmPassword}
          />
        </div>
        <label className="remember-check mb-2">
          <input
            type="checkbox"
            checked={form.agreeToTerms}
            onChange={(e) => update("agreeToTerms", e.target.checked)}
          />
          I agree to the Terms of Service and Privacy Policy
        </label>
        {errors.agreeToTerms && <p className="field-error mb-3">{errors.agreeToTerms}</p>}
        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>
    </AuthLayout>
  );
}

export default Register;
