import React from "react";

export default function List({ users, handleDelete, updateUI }) {


  return (
    <div>
      <ul>
        {users && users.map((item) => {
          return (
            <>
              <li key={item.id}>name: {item.name}  email: {item.email}  phone:{item.phone}</li>
              <button onClick={() => updateUI(item.id)}>edit</button> <button onClick={() => handleDelete(item.id)}>delete</button>
            </>
          );
        })}
      </ul>
    </div>
  );
}
