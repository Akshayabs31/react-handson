import { useState, useEffect, useRef } from "react";
import './App.css';
import {
  Button,
  EditableText,
  InputGroup,
  OverlayToaster,
  Position
} from "@blueprintjs/core";

export default function App() {
  const toaster = useRef(null);

  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  function onChangeHandler(id, field, value) {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, [field]: value };
      }
      return user;
    });
    setUsers(updatedUsers);
  }

  function updateUser(id) {
    const userToUpdate = users.find((user) => user.id === id);
    if (!userToUpdate) return;

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userToUpdate),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      }
    })
      .then((res) => res.json())
      .then((json) => {
        const updated = users.map((u) => (u.id === id ? json : u));
        setUsers(updated);

        toaster.current.show({
          message: "User updated successfully!",
          intent: "success",
          timeout: 3000,
        });
      });
  }
  function deleteUser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method:'DELETE',

    })
    .then((res)=>{
      if(res.ok){
        const updatedUsers=users.filter((user)=>user.id!==id);
        setUsers(updatedUsers);
        toaster.current.show({
          message: "User deleted successfully!",
          intent: "success",
          timeout: 3000,
        });
      }});
  }
  function addUser() {
    if (!newName || !newEmail || !newWebsite) return;

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: newName,
        email: newEmail,
        website: newWebsite
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      }
    })
      .then((res) => res.json())
      .then((json) => {
        setUsers([...users, json]);

        toaster.current.show({
          message: "User added successfully!",
          intent: "success",
          timeout: 3000,
        });

        setNewName("");
        setNewEmail("");
        setNewWebsite("");
      });
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="main-title">User Manager</h1>
          <p className="subtitle">Edit, update and manage user data fetched from a sample API</p>
        </div>
      </header>

      <OverlayToaster ref={toaster} position={Position.TOP} />

      <div className="data-card">
        <table className="bp4-html-table modifier">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <EditableText
                  onChange={(value) => onChangeHandler(user.id, "email", value)}
                  value={user.email}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) => onChangeHandler(user.id, "website", value)}
                  value={user.website}
                />
              </td>
            <td>
  <div className="action-buttons">
    <Button intent="primary" onClick={() => updateUser(user.id)}>
      Update
    </Button>
    <Button intent="danger" onClick={() => deleteUser(user.id)}>
      Delete
    </Button>
  </div>
</td>

            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                placeholder="Enter Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </td>
            <td>
              <InputGroup
                placeholder="Enter Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </td>
            <td>
              <InputGroup
                placeholder="Enter Website"
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
              />
            </td>
            <td>
              <Button intent="success" onClick={addUser}>
                Add User
              </Button>
            </td>
          </tr>
        </tfoot>
        </table>
      </div>
    </div>
  );
}
