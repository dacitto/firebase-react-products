import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const [newName, setNewName] = useState("");
  const [age, setAge] = useState(0);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(age) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);
  return (
    <div className="App">
      <input
        type="text"
        name="newName"
        onKeyUp={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        max={120}
        min={18}
        name="newAge"
        onKeyUp={(e) => setAge(e.target.value)}
      />

      <button onClick={createUser}>Add User</button>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h4>{user.age}</h4>
          <button onClick={() => updateUser(user.id, user.age)}>
            increase age
          </button>
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
}

export default App;
