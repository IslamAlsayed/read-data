import { useState } from "react";
import { login } from "../../axiosConfig/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("islam@gmail.com");
  const [password, setPassword] = useState("test1234");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await login(email, password);

      if (response.status === 200) {
        setEmail("");
        setPassword("");
        setError(response.message);
        setTimeout(() => navigate("/index"), 500);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="formUser">
      <div className="contentLogin">
        <a href="/">
          <h1>
            <i className="fas fa-link"></i> logo name
          </h1>
        </a>
        <form autoComplete="off" onSubmit={handleSubmit}>
          {error && <div className="alert">{error}</div>}
          <div className="group-input">
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="group-input">
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="group-input">
            <button type="submit">Login</button>
          </div>
          <div className="otherForm">
            <a href="/auth/register">register</a>
          </div>
        </form>
      </div>
    </div>
  );
}
