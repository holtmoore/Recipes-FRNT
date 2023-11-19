import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UpdateUser = () => {
    const userID = useGetUserID();
    const [cookies] = useCookies(["access_token"]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        imageUrl: ""
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                `https://recipesback.onrender.com/auth/update-user/${userID}`,
                user,
                { headers: { Authorization: `Bearer ${cookies.access_token}` } }
            );

            alert("User Updated");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await axios.delete(`https://recipesback.onrender.com/auth/delete-user/${userID}`, {
                    headers: { Authorization: `Bearer ${cookies.access_token}` },
                });

                alert("User Deleted");
                navigate("/"); // or navigate to a different route if necessary
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };
  
    return (
      <div className="update-user">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={user.imageUrl}
            onChange={handleChange}
          />
              <button type="submit">Update User</button>
            </form>
            <form onSubmit={handleDelete}>
                <button type="submit" style={{ backgroundColor: "red", color: "white" }}>
                    Delete Account
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;
