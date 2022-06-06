import { React, useState } from "react";
import PersonAvatar from "./PersonAvatar";
import caution from "../assets/caution.png";
import { NavLink, useNavigate } from "react-router-dom";
function Person(props) {
  const [CautionHidden, SetCautionHidden] = useState(true);
  const navigate = useNavigate();

  const CautionData = (isHidden) => {
    if (!isHidden) {
      return (
        <div
          id="Caution"
          dangerouslySetInnerHTML={{ __html: props.children.caution }}
        ></div>
      );
    } else return;
  };

  const ThereIsCautionData = (data) => {
    if (data == undefined) {
      return;
    } else {
      return (
        <div
          id="CautionDiv"
          onMouseEnter={() => SetCautionHidden(false)}
          onMouseLeave={() => SetCautionHidden(true)}
        >
          <img id="CautionImg" src={caution} />
        </div>
      );
    }
  };

  const AliasesList = (aliases) => {
    {
      if (aliases != null) {
        return (
          <div>
            <strong>Also known as: </strong>
            {aliases.join(", ")}
          </div>
        );
      }
    }
  };

  return (
    //<NavLink to={`/Person/${props.children.title}`}>
    <div
      className="Person"
      onClick={() => {
        navigate(`/Person/${props.children.title}`);
      }}
    >
      <div id="Title">
        <h1>{props.children.title}</h1>
        {ThereIsCautionData(props.children.caution)}
      </div>
      {AliasesList(props.children.aliases)}
      <PersonAvatar>{props.children.images}</PersonAvatar>
      {CautionData(CautionHidden)}
    </div>
    // </NavLink>
  );
}

export default Person;
