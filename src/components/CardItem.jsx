import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelectedUid } from "../contexts/SelectedUidContext";

function CardItem(props) {
  const { setSelectedUidData } = useSelectedUid();

  const handleClick = () => {
    setSelectedUidData({
      selectedUid: props.uid,
      donationType: props.donationType,
      amount: props.amount,
      title: props.label,
      description: props.text,
      dispensed: props.dispensed,
    });
  };

  return (
    <>
      <li className="cards__item">
        <Link
          to="/MissionMatch/grant"
          className="cards__item__link"
          onClick={handleClick}
        >
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img src={props.src} alt="IMG" className="cards__item__img" />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
