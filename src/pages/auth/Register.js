import React, { useState } from "react";
import styles from "./auth.module.scss";
import RegisterImg from "../../assests/register.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Card from "../../components/cards/Card";

// React toastify for notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Creating users
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Navigation
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords do not match");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
              <button className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an account? </p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>

        <div className={styles.img}>
          <img src={RegisterImg} alt="login" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
