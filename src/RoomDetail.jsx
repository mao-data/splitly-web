import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  doc, getDoc, updateDoc, collection, addDoc, onSnapshot
} from "firebase/firestore";

export default function RoomDetail({ roomId }) {
  const [room, setRoom] = useState(null);
  const [newMember, setNewMember] = useState("");
  const [payer, setPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [forWhom, setForWhom] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", roomId), (docSnap) => {
      setRoom(docSnap.data());
    });

    const expenseCol = collection(db, "rooms", roomId, "expenses");
    const unsubExpenses = onSnapshot(expenseCol, (snap) => {
      setExpenses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsub();
      unsubExpenses();
    };
  }, [roomId]);

  const handleAddMember = async () => {
    if (!newMember || room.members.includes(newMember)) return;
    await updateDoc(doc(db, "rooms", roomId), {
      members: [...room.members, newMember]
    });
    setNewMember("");
  };

  const handleAddExpense = async () => {
    await addDoc(collection(db, "rooms", roomId, "expenses"), {
      payer,
      amount: parseFloat(amount),
      for: forWhom.split(",").map(s => s.trim()),
      description
    });
    setAmount("");
    setForWhom("");
    setDescription("");
  };

  if (!room) return <p>Loading...</p>;

  return (
    <div>
      <h2>{room.name} 房間</h2>
      <p>成員：{room.members.join(", ")}</p>

      <h4>新增成員</h4>
      <input value={newMember} onChange={e => setNewMember(e.target.value)} />
      <button onClick={handleAddMember}>加入</button>

      <h4>新增支出</h4>
      <input placeholder="付錢人" value={payer} onChange={e => setPayer(e.target.value)} />
      <input placeholder="金額" value={amount} onChange={e => setAmount(e.target.value)} />
      <input placeholder="給誰（用逗號分隔）" value={forWhom} onChange={e => setForWhom(e.target.value)} />
      <input placeholder="備註" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={handleAddExpense}>記帳</button>

      <h4>支出紀錄</h4>
      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>{exp.payer} paid ${exp.amount} for {exp.for.join(", ")} - {exp.description}</li>
        ))}
      </ul>
    </div>
  );
}
