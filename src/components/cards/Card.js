import React from "react";
import styles from "./Card.module.scss";

const Card = ({ cardClass, children }) => {
  return (
    <>
      <div className={`${styles.card} ${cardClass}`}>{children}</div>
    </>
  );
};

export default Card;
