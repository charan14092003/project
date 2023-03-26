import React from "react";
import { useState } from "react";
import Btn from "../Btn";
import axios from "axios";
import "./Addadmin.css";
import Header from "../Navbar/Header";
import { navItems } from "./NavItems";

function Addadmin(props) {
  const [userinfo, setUserinfo] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    gender: "",
    phonenumber: "",
    role: "admin",
  });

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...userinfo,
      [e.target.name]: e.target.value,
    };
    setUserinfo(nextFieldState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (/\s/.test(userinfo.username || userinfo.username.trim().length < 1)) {
      alert("Username should not contain spaces");
    } else if (
      userinfo.email.trim().length < 1 ||
      !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(userinfo.email)
    ) {
      //  eslint-disable-line
      alert("Invalid Email");
    } else if (userinfo.password.trim().length < 6) {
      alert("Password should be altleast 6 characters");
    } else if (userinfo.password !== userinfo.confirmedPassword) {
      alert("Passwords are not matching");
    } else {
      // setRegisterError([false, ""]);
      const user = {
        id: new Date().valueOf(),
        username: userinfo.username,
        email: userinfo.email,
        password: userinfo.password,
        role: "admin",
      };
      axios.post("http://localhost:9000/users/register", user).then((resp) => {
        if (resp.status !== 200) {
          alert(resp.data.msg);
        } else {
          setUserinfo({
            username: "",
            name: "",
            email: "",
            password: "",
            confirmedPassword: "",
            gender: "",
            phonenumber: "",
          });
          alert(resp.data.msg);
        }
      });
    }
  };

  return (
    <>
      <Header user={true} navItems={navItems} />
      <div className="addadminpage">
        <h2>Add admin</h2>
        <form onSubmit={submitHandler} className="addadmin">
          <label htmlFor="name">
            Name:
            <input
              placeholder={"name"}
              type={"text"}
              name={"name"}
              value={userinfo.name}
              onChange={onUpdateField}
            />
          </label>
          <label htmlFor="username">
            Username:
            <input
              placeholder={"username"}
              type={"text"}
              name={"username"}
              value={userinfo.username}
              onChange={onUpdateField}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              placeholder={"email"}
              type={"text"}
              name={"email"}
              value={userinfo.email}
              onChange={onUpdateField}
            />
          </label>
          <label htmlFor="phonenumber">
            Phone number:
            <input
              placeholder={"phonenumber"}
              type={"text"}
              name={"phonenumber"}
              value={userinfo.phonenumber}
              onChange={onUpdateField}
            />
          </label>
          <label htmlFor="gender" value={userinfo.gender}>
            {" "}
            Gender:
            <select name="gender" onChange={onUpdateField}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label htmlFor="image">
            {" "}
            Profile photo:
            <input type="file" name="image" />
          </label>
          <label htmlFor="password">
            {" "}
            Password:
            <input
              placeholder={"password"}
              type={"password"}
              name={"password"}
              value={userinfo.password}
              onChange={onUpdateField}
            />
          </label>
          <label htmlFor="confirmedPassword">
            {" "}
            Confirm Password:
            <input
              placeholder={"confirm password"}
              type={"password"}
              name={"confirmedPassword"}
              value={userinfo.confirmedPassword}
              onChange={onUpdateField}
            />
          </label>
          <Btn type="submit" value="register" />
        </form>
      </div>
    </>
  );
}

export default Addadmin;
