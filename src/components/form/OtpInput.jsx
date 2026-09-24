import { useRef } from "react";

// Six separate boxes that behave like one field. `value` is a 6-item
// array of single digits (or empty strings) the comes from the parent page;
// This component handles what happens when you type, delete, or paste the code:
//   - typing a digit auto-focuses the next box
//   - backspace on an empty box focuses the previous one
//   - pasting a full code fills every box at once



const OtpInput = ({ value, onChange, error }) => {
  const inputsRef = useRef([]);

  function handleChange(index, rawValue) {
    if (!/^\d?$/.test(rawValue)) return; // only allow a single digit.
    const next = [...value];
    next[index] = rawValue;
    onChange(next);
    if (rawValue && index < value.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(event) {
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, value.length);
    if (!digits) return;
    event.preventDefault();
    const next = Array(value.length).fill("");
    digits.split("").forEach((digit, i) => {
      next[i] = digit;
    });
    onChange(next);
    inputsRef.current[Math.min(digits.length, value.length - 1)]?.focus();
  }

  return (
    <div>
      <div className="otp-input-row" onPaste={handlePaste}>
        {value.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputMode="numeric"
            maxLength={1}
            className={`otp-box ${error ? "otp-box-error" : ""}`}
            autoFocus={index === 0}
          />
        ))}
      </div>
      {error && <p className="field-error text-center">{error}</p>}
    </div>
  );
}

export default OtpInput;
