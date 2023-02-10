import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import Btn from "../Btn";
import axios from "axios";
import "./AddPlaces.css";

function AddPlaces() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const days = ["Three", "Five", "Both"];
  const busType = ["AC", "NON-AC", "Both"];
  const navItems = [
    {
      title: "Home",
      path: "/admin",
    },
    {
      title: "add admin",
      path: "/adminform",
    },
    {
      title: "add place",
      path: "/adminplaces",
    },
  ];
  const [image, setImage] = useState();
  const [placeinfo, setplaceinfo] = useState({
    from: "",
    to: "",
    price: "",
    details: "",
    category: "",
    busType: "",
    days: 0,
  });

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...placeinfo,
      [e.target.name]: e.target.value,
    };
    setplaceinfo(nextFieldState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("id", new Date().valueOf() + Math.floor(Math.random() * 10));
    fd.append("from", placeinfo.from);
    fd.append("to", placeinfo.to);
    fd.append("details", placeinfo.details);
    fd.append("category", placeinfo.category);
    fd.append("busType", placeinfo.busType);
    fd.append("days", placeinfo.days);
    fd.append("photo", image);
    axios
      .post(`http://localhost:9000/admins/place/${user.username}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setplaceinfo({
            from: "",
            to: "",
            price: "",
            details: "",
            category: "",
          });
          setImage();
          alert(resp.data.success);
        } else {
          navigate("/error");
        }
      });
  };
  return (
    <div>
      <Header user={true} navItems={navItems} />
      <div className="addplace">
        <h1>Add place</h1>
        <form onSubmit={submitHandler}>
          <input
            placeholder="from"
            type="text"
            name="from"
            value={placeinfo.from}
            onChange={onUpdateField}
          />
          <input
            placeholder="to"
            type="text"
            name="to"
            value={placeinfo.to}
            onChange={onUpdateField}
          />
          <input
            placeholder="price"
            type="number"
            name="price"
            value={placeinfo.price}
            onChange={onUpdateField}
          />
          <input
            placeholder="details"
            type="text"
            name="details"
            value={placeinfo.details}
            onChange={onUpdateField}
          />
          <input
            placeholder="category"
            type="text"
            name="category"
            value={placeinfo.category}
            onChange={onUpdateField}
          />
          <select name="days" onChange={onUpdateField}>
            <option>No.of days</option>
            {days.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
          <select name="busType" onChange={onUpdateField}>
            <option>Bus Types</option>
            {busType.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
          <input
            placeholder="choose picture"
            type="file"
            name="photo"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Btn type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

export default AddPlaces;