import { useState } from "react";
import RoomCreate from "./RoomCreate";
import RoomDetail from "./RoomDetail";

function App() {
  const [roomId, setRoomId] = useState("");

  return (
    <div className="App">
      <h1>Splitly 拆帳 App</h1>
      {!roomId ? (
        <>
          <RoomCreate />
          <h3>或輸入房間 ID 加入：</h3>
          <input onChange={(e) => setRoomId(e.target.value)} placeholder="輸入房間 ID" />
        </>
      ) : (
        <RoomDetail roomId={roomId} />
      )}
    </div>
  );
}

export default App;
