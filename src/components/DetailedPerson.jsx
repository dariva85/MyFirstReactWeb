import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import PersonAvatar from "./PersonAvatar";
import { getPerson } from "./Api";
import backImage from "../assets/back.png";
import "./DetailedPerson.css";

function DetailedPerson() {
  const { personId } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const result = await getPerson(personId);

      setData(result);

      return () => {
        setData([]);
      };
    };

    getData();

    return () => {
      console.log("cleaning");
    };
  }, []);

  const AddDetail = (info, detailKey, shownName) => {
    try {
      if (info[detailKey] != null)
        return (
          <div className="Details">
            <strong>{shownName}: </strong>
            {info[detailKey]}
          </div>
        );
    } catch (e) {
      return;
    }
  };

  const AddColumnDetail = (info, shownName) => {
    try {
      if (info != null) {
        return (
          <div className="Details">
            <strong>{shownName}: </strong>
            {info}
          </div>
        );
      }
    } catch (e) {
      return;
    }
  };

  const AddHtmlDetail = (data, detailKey, shownName) => {
    try {
      if (data[detailKey] != null)
        return (
          <div className="Details">
            <strong>{shownName}: </strong>
            <div dangerouslySetInnerHTML={{ __html: data[detailKey] }}></div>
          </div>
        );
    } catch (e) {
      return;
    }
  };

  const AddColumnDetails = (data) => {
    let column1 = [];
    let column2 = [];
    const details = [
      { var: "weight_min", name: "Weight min" },
      { var: "weight_max", name: "Weight max" },
      { var: "height_min", name: "Height min" },
      { var: "height_max", name: "Height max" },
      { var: "hair", name: "Hair" },
      { var: "eyes", name: "Eyes" },
      { var: "race", name: "Race" },
      { var: "race_raw", name: "Race Raw" },
    ];

    details.forEach((detail) => {
      if (data[detail.var] != null) {
        detail.data = data[detail.var];
        if (column1.length == column2.length) {
          column1.push(detail);
        } else {
          column2.push(detail);
        }
      }
    });
    console.log(
      column1.map((detail) => {
        AddColumnDetail(detail.data, detail.name);
      })
    );
    return (
      <div className="Columns">
        <div className="Column">
          {column1.map((detail) => AddColumnDetail(detail.data, detail.name))}
        </div>
        <div className="Column">
          {column2.map((detail) => AddColumnDetail(detail.data, detail.name))}
        </div>
      </div>
    );
  };

  const GetAliasesList = (aliases) => {
    if (aliases != null) {
      return (
        <div>
          <strong>Also known as: </strong>
          {aliases.join(", ")}
        </div>
      );
    }
  };

  if (data === null) {
    return (
      <div className="Spinner">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }
  return (
    <div className="DetailedPerson">
      <div className="Person">
        <div
          id="Back"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <img id="BackImage" src={backImage} />
          Back
        </div>
        <div id="Title">
          <h1>{data.title}</h1>
        </div>
        {GetAliasesList(data.aliases)}
        <div>
          <PersonAvatar isDetailed="true">{data.images}</PersonAvatar>
        </div>
        {AddDetail(data, "publication", "Publication")}
        {AddDetail(data, "warning_message", "Warning Message")}
        {AddDetail(data, "url", "URL")}
        {AddDetail(data, "nationality", "Nationality")}
        {AddHtmlDetail(data, "remarks", "Remarks")}
        {AddColumnDetails(data)}
        {AddHtmlDetail(data, "caution", "Caution")}
      </div>
    </div>
  );
}

export default DetailedPerson;
