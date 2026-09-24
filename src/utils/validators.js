// These are simple validation functions used by all the forms.
// Keeping them here avoids repeating the same validation code on each page
// and makes it easier to update the rules in one place.

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPasswordValid(password) {
  return password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
}

// Used to render the little checklist under password fields.
export function getPasswordChecklist(password) {
  return [
    { label: "At least 8 characters", passed: password.length >= 8 },
    { label: "One number", passed: /\d/.test(password) },
    { label: "One uppercase letter", passed: /[A-Z]/.test(password) },
  ];
}
