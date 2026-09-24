
// All screens use the functions in this file instead of calling the server
// directly. Since there is no real backend yet, these functions simulate
// an API request with a delay and return or throw a response like a real API.

const NETWORK_DELAY = 900;
const DEMO_OTP = "123456";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginUser({ email, password }) {
  await wait(NETWORK_DELAY);
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  return { email, token: "demo-token" };
}

export async function registerUser({ name, email, password }) {
  return { name, email };
}

export async function requestPasswordReset({ email }) {
  await wait(NETWORK_DELAY);
  return { email };
}

export async function verifyOtp({ email, code }) {
  await wait(700);
  if (code !== DEMO_OTP) {
    throw new Error(`Incorrect code. Use ${DEMO_OTP} for this demo.`);
  }
  return { verified: true };
}

export async function resendOtp({ email }) {
 await wait(500);
  return { sent: true };
}

export async function resetPassword({ email, password }) {
 await wait(NETWORK_DELAY);
  return { success: true };
}

export const DEMO_OTP_CODE = DEMO_OTP;