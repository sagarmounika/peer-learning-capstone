import React  from "react";
import spinner2 from "./spinner2.gif";
import './Spinner.css'


export default () => (
  <div className="spinner">
    <img
      src={spinner2}
      alt="Loading..."
    />
  </div>
);
