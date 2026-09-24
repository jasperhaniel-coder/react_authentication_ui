import { FaSpinner } from "react-icons/fa";

// One button used at the bottom of every form. `loading` disables it
// and swaps the label for a spinning icon, so the user gets a feedback.
const SubmitButton = ({ loading, children }) => {
  return (
    <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
      {loading ? <FaSpinner className="spin-icon" /> : children}
    </button>
  );
}

export default SubmitButton;
