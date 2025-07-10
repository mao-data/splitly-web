import { useEffect, useState } from "react";
import RoomCreate from "./components/RoomCreate";
import RoomDetail from "./components/RoomDetail";
import LoginCard from "./components/LoginCard";
import { db } from "./firebaseconfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./App.css";
import illustration from "./assets/illustration_simple_blackwhite.jpg";

function App() {
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState(null);
  const [userRooms, setUserRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);

  useEffect(() => {
    const fetchUserRooms = async () => {
      if (!user) return;
      setLoadingRooms(true);
      try {
        const q = query(collection(db, "rooms"), where("members", "array-contains", user.uid));
        const querySnapshot = await getDocs(q);
        const rooms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserRooms(rooms);
      } catch (error) {
        console.error("取得房間失敗：", error);
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchUserRooms();
  }, [user]);

  if (!user) {
    return <LoginCard onLogin={setUser} />;
  }

  return (
    <div className="app-container">
      <div className="hero">
        {/* <img src={illustration} alt="Splitly Illustration" className="hero-img" /> */}
        <h1>Splitly 幫你輕鬆拆帳 🧾</h1>
        <p>無論聚會、旅行或房租費用，讓拆帳變得簡單又公平。</p>
        <p className="uid">你的 UID：{user.uid}</p>
        <button className="logout-btn" onClick={() => setUser(null)}>登出</button>
      </div>

      <section className="card">
        <h2>🗂️ 你加入的房間</h2>
        {loadingRooms ? (
          <p>載入中...</p>
        ) : (
          <ul className="room-list">
            {userRooms.map(room => (
              <li key={room.id} onClick={() => setRoomId(room.id)} className="room-item">
                <strong>{room.name || room.id}</strong><br />
                👤 成員數：{room.members?.length || 0} | 🧑‍💼 建立者：{room.owner || "未知"}
              </li>
            ))}
          </ul>
        )}
      </section>

      {!roomId ? (
        <main className="card-section">
          <section className="card">
            <h2>📦 建立新房間</h2>
            <RoomCreate />
          </section>

          <section className="card">
            <h2>🔑 加入房間</h2>
            <input
              className="input"
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="輸入房間 ID"
            />
          </section>
        </main>
      ) : (
        <main className="main-section">
          <button className="back-btn" onClick={() => setRoomId("")}>← 返回</button>
          <RoomDetail roomId={roomId} />
        </main>
      )}
    </div>
  );
}

export default App;
