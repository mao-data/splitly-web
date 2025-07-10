import { auth, provider } from "../firebaseconfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return unsubscribe;
  }, []);

  const login = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);

  return (
    <div>
      {user ? (
        <>
          <p>👋 Hello, {user.displayName}</p>
          <p>UID: <code>{user.uid}</code></p>
          <p>Email: {user.email}</p>
          {user.uid === "YOUR_SUPER_ADMIN_UID" && <p>🦸‍♂️ You are Super Admin!</p>}
          <button onClick={logout}>登出</button>
        </>
      ) : (
        <button onClick={login}>使用 Google 登入</button>
      )}
    </div>
  );
}
