import { React, useState } from "react";
import PersonAvatar from "./PersonAvatar";
import caution from "../assets/caution.png";
import { useNavigate } from "react-router-dom";
import "./Person.css";

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

  const ShowCautionImageIfExistsCautionData = (data) => {
    if (data == undefined) {
      return;
    } else {
      return (
        <div
          id="CautionDiv"
          //onMouseEnter={() => SetCautionHidden(false)}
          //onMouseLeave={() => SetCautionHidden(true)}
          onClick={(event) => {
            event.stopPropagation();
            SetCautionHidden((prev) => !prev);
          }}
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
        <h3>{props.children.title}</h3>
        {ShowCautionImageIfExistsCautionData(props.children.caution)}
      </div>
      {AliasesList(props.children.aliases)}
      <PersonAvatar isDetailed="false">{props.children.images}</PersonAvatar>
      {CautionData(CautionHidden)}
    </div>
    // </NavLink>
  );
}

export default Person;
