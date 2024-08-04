import { useState } from "react";
import { register } from "../../axiosConfig/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || password_confirmation) {
      setError("This Faileds are required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const data = await register(email, password);

      if (data.status === "success") {
        setName("");
        setEmail("");
        setPassword("");
        setPassword_confirmation("");
        navigate("/index");
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
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
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
            <label htmlFor="password_confirmation">password_confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={password_confirmation}
              onChange={(event) => setPassword_confirmation(event.target.value)}
            />
          </div>
          <div className="group-input">
            <button type="submit">Login</button>
          </div>
          <div className="otherForm">
            <a href="/auth/login">login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
