import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="Welcome">
      <h1>welcome in website</h1>

      <a href="/index" className="btn btn-main">
        go to Index
        <i className="fas fa-link"></i>
      </a>
    </div>
  );
}
