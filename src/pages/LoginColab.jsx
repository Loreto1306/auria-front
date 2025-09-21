import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginColab() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://auriadb.netlify.app/api/login", {// dev: http://localhost:3000/api/logi
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login bem-sucedido!");
        console.log("Token JWT:", data.token);
        navigate("/"); // redireciona para Home
      } else {
        alert(data.error || "Email ou senha incorretos!");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <h1>Login Colaborador</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Link to="/cadastro">Não possui cadastro? Cadastre-se</Link>
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginColab;
