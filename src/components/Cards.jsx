import CardItem from "./CardItem";
import "./Cards.css";
import { SigninContext } from "../contexts/SigninContext";
import { useState, useEffect, useContext } from "react";

function Cards() {
  const { currentUser } = useContext(SigninContext);
  return (
    <div className="cards">
      <h1>Discover Missions inspired by many like you</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="./images/img-10.jpg"
              text="Fight back against Cancer"
              label="Medical"
              path={
                currentUser != null
                  ? "/MissionMatch/grant"
                  : "/MissionMatch/sign-up"
              }
            ></CardItem>
            <CardItem
              src="./images/img-3.jpg"
              text="Help combat against illegal Whaling"
              label="Emergency Relief"
              path={
                currentUser != null
                  ? "/MissionMatch/grant"
                  : "/MissionMatch/sign-up"
              }
            ></CardItem>
          </ul>
          <ul className="cards__items">
            <CardItem
              src="./images/img-12.jpg"
              text="Rebuild broken hearts, Help aid Victims of Earthquakes"
              label="Emergency Relief"
              path={
                currentUser != null
                  ? "/MissionMatch/grant"
                  : "/MissionMatch/sign-up"
              }
            />
            <CardItem
              src="./images/img-13.jpg"
              text="Help rebuild a beloved run down Trail"
              label="Community"
              path={
                currentUser != null
                  ? "/MissionMatch/grant"
                  : "/MissionMatch/sign-up"
              }
            />
            <CardItem
              src="./images/img-11.jpg"
              text="Ease the scars of war, help Veterans with PTSD"
              label="Medical"
              path={
                currentUser != null
                  ? "/MissionMatch/grant"
                  : "/MissionMatch/sign-up"
              }
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
