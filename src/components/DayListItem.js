import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {

  let dayItem = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0})
  

  const formatSpots = (spots) => {
    let sentance = `${spots} `
    if (spots > 1) {
      sentance += `spots remaining`
      return sentance;

    } else if(spots === 1) {
      sentance += `spot remaining`
      return sentance;

    } else {
      sentance = `no spots remaining`
      return sentance;
    }
  }

  return (
    <li className={dayItem} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}