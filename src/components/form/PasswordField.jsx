import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// This is like the InputField, but it can show or hide the password.
// visible keeps track of whether the password is showing or hidden.

const PasswordField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  autoFocus = false,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mb-3">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="password-input-wrap">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className={`field-input ${error ? "field-input-error" : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export default PasswordField;
