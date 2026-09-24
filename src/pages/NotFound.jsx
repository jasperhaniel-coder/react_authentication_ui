import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";

const NotFound = () => {
  return (
    <AuthLayout title="Page not found" subtitle="404 — that page doesn't exist.">
      <Link to="/login" className="link-btn">
        Back to log in
      </Link>
    </AuthLayout>
  );
}

export default NotFound;
