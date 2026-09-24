// This is a  plain labeled text input, reused by every form in the app.
// It is a "controlled input": its value always comes from the parent's
// state via `value`, this component just displays it and forwards events.

const InputField = ({ 
  id, 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  error, 
  autoFocus = false })=> {

  return (
    <div className="mb-3">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`field-input ${error ? "field-input-error" : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export default InputField;
