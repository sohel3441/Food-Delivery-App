import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div
        className="card shadow-lg p-5 text-center"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}
      >
        <h1 className="mb-4">🔐 Welcome to Password Reset App</h1>

        <h5 className="mb-3">📋 Key Features</h5>
        <ul className="list-unstyled text-start mx-auto" style={{ maxWidth: "400px" }}>
          <li className="mb-2">✅ User Registration</li>
          <li className="mb-2">✅ Secure JWT-based Login</li>
          <li className="mb-2">✅ Forgot Password with Email Support</li>
          <li className="mb-2">✅ Reset Password via Token</li>
        </ul>

        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/login" className="btn btn-primary btn-lg px-4">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline-secondary btn-lg px-4">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}