import React, { useEffect, useState } from "react";
import List from "./List";

export default function Form() {
  const [input, setInput] = useState({ name: "", phone: "+91", email: "" });
  const [users, setUsers] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false)
  const [updateId, setUpdateId] = useState(-1)
  useEffect(() => {

    getData();
  }, []);
  //************  retreive data************************
  const getData = async () => {
    try {
      console.log("getdata called")
      const response = await fetch("http://localhost:8000");
      const data = await response.json();
      console.log(data)
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
    //return data
  };
  //*************************submitting data**************** */
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!updateFlag) {

        // console.log(input);
        const response = await fetch("http://localhost:8000/postData", {
          method: "POST",
          headers: {

            "Content-Type": "application/json"
          },
          body: JSON.stringify(input)
        });
        const data = await response.json()
        setUsers(data)
        // console.log(data)

        setInput({ name: "", phone: "+91", email: "" });
      }
      if (updateFlag) {
        updateData(updateId)
      }

    } catch (err) {
      console.log(err.message)
    }
  };
  //********************deleting data**************** */
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/deleteData/${id}`, {
        method: "DELETE"
      });
      console.log("object")
      console.log("")
      getData()
    } catch (error) {

    }
  }
  //*************update ui ************** */
  const updateUI = async (id) => {
    const response = await fetch(`http://localhost:8000/findbyid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
    const data = await response.json()
    setInput(data)
    setUpdateFlag(true)
    setUpdateId(id)
  }
  //**********************update data ************************/
  const updateData = async (id) => {
    const response = await fetch(`http://localhost:8000/updateData/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
    setUpdateFlag(false)
    setUpdateId(-1)
    setInput({ name: "", phone: "+91", email: "" })
    getData()
  }
  //*******************onChange handler */
  const changeHandeler = (e) => {
    console.log(e.target.value);
    let field = e.target.name;
    setInput({ ...input, [field]: e.target.value });
  };
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="name"
          onChange={changeHandeler}
          required
          name="name"
          value={input.name}
        />
        <br />
        <input
          type="text"
          placeholder="phone"
          onChange={changeHandeler}
          required
          name="phone"
          value={input.phone}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          onChange={changeHandeler}
          required
          name="email"
          value={input.email}
        />
        <br />
        <button type="submit">{!updateFlag && "submit"}{updateFlag && "update"}</button>
      </form>
      <List users={users} handleDelete={handleDelete} getData={getData} updateUI={updateUI} />
    </div>
  );
}
