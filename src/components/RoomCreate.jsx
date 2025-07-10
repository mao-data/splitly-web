import { useState } from "react";
import { db } from "../firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

export default function RoomCreate() {
  const [roomName, setRoomName] = useState("");

  const handleCreate = async () => {
    if (!roomName) return;
    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        name: roomName,
        members: []
      });
      alert("房間建立成功，ID: " + docRef.id);
    } catch (err) {
      console.error("❌ 發生錯誤:", err.code, err.message);
    }
  };

  return (
    <div>
      <h2>建立房間</h2>
      <input value={roomName} onChange={e => setRoomName(e.target.value)} />
      <button onClick={handleCreate}>建立</button>
    </div>
  );
}
