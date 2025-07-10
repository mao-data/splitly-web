import { useEffect, useState } from "react";
import { auth, provider } from "../firebaseconfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import "./css/LoginCard.css";

export default function LoginCard({ onLogin }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) onLogin(u);
    });
    return unsub;
  }, [onLogin]);

  const handleLogin = () => {
    signInWithPopup(auth, provider).catch((err) => {
      console.error("登入錯誤：", err.message);
    });
  };

  const handleLogout = () => {
    signOut(auth).catch((err) => {
      console.error("登出錯誤：", err.message);
    });
  };

  return (
    <div className="login-card">
      <h1>🧾 Splitly</h1>
      <p>簡單、方便的多人拆帳工具</p>
      {!user ? (
        <button onClick={handleLogin}>使用 Google 登入</button>
      ) : (
        <>
          <p>👋 歡迎，{user.displayName}</p>
          <button onClick={handleLogout}>登出</button>
        </>
      )}
    </div>
  );
}
