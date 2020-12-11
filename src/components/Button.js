import React from "react";
import "components/Button.scss";
const classNames = require('classnames');


export default function Button(props) {

   let buttonClasses = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   })

   return (
      <button
         className={buttonClasses}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );

}
