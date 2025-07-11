import { useState } from "react";
import { db, auth } from "../firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

export default function RoomCreate() {
  const [roomName, setRoomName] = useState("");

  const handleCreate = async () => {
    const user = auth.currentUser;
    if (!roomName || !user) return;

    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        name: roomName,
        members: [user.uid],     // ✅ 將使用者加入 members 陣列
        owner: user.uid,         // ✅ 設定為房間建立者
        createdAt: new Date()
      });
      alert("房間建立成功，ID: " + docRef.id);
      setRoomName("");
    } catch (err) {
      console.error("❌ 發生錯誤:", err.code, err.message);
    }
  };

  return (
    <div>
      <input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="房間名稱"
      />
      <button onClick={handleCreate}>建立</button>
    </div>
  );
}
