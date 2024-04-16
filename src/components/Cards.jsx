import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";

function Cards() {
  return (
    <div className="cards">
      <h1>Discover Missions inspired by many like you</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="/images/img-10.jpg"
              text="Fight back against Cancer"
              label="Medical"
              path="/services"
            ></CardItem>
            <CardItem
              src="/images/img-3.jpg"
              text="Help combat against illegal Whaling"
              label="Emergency Relief"
              path="/services"
            ></CardItem>
          </ul>
          <ul className="cards__items">
            <CardItem
              src="/images/img-12.jpg"
              text="Rebuild broken hearts, Help aid Victims of Earthquakes"
              label="Emergency Relief"
              path="/services"
            />
            <CardItem
              src="/images/img-13.jpg"
              text="Help rebuild a beloved run down Trail"
              label="Community"
              path="/services"
            />
            <CardItem
              src="/images/img-11.jpg"
              text="Ease the scars of war, help Veterans with PTSD"
              label="Medical"
              path="/services"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
