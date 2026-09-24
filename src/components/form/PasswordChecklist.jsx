import { FaCheck, FaTimes } from "react-icons/fa";
import { getPasswordChecklist } from "../../utils/validators";

// Live feedback under a password field, so the user knows exactly
// which requirement they are still missing instead of guessing.
  
const PasswordChecklist = ({ password }) => {
  const checks = getPasswordChecklist(password);
  return (
    <ul className="password-checklist">
      {checks.map((check) => (
        <li key={check.label} className={check.passed ? "check-passed" : "check-pending"}>
          {check.passed ? <FaCheck /> : <FaTimes />}
          <span>{check.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default PasswordChecklist;
