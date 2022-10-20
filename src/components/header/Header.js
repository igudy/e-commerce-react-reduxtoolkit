import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import {FaShoppingCart} from 'react-icons/fa';

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        iG<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
          <div className={styles["header-right"]}>
            <span className={styles.links}>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                <Link to='/order-history'>My Orders</Link>
            </span>
            <span className={styles.cart}>
                <Link to='/cart'><FaShoppingCart size={20} /></Link>
            </span>

          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
