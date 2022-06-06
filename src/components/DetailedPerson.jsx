import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import PersonAvatar from "./PersonAvatar";

function DetailedPerson() {
  const { personId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      console.log(`Looking for ${personId}`);
      const results = await axios("https://api.fbi.gov/wanted/v1/list", {
        params: { title: personId },
      });
      console.log(results);
      setData(results.data.items[0]);

      return () => {
        setData([]);
      };
    };

    getData();

    return () => {
      console.log("cleaning");
    };
  }, []);

  const AddDetail = (data, detailKey, shownName) => {
    try {
      if (data[detailKey] != null)
        return (
          <div className="Details">
            <strong>{shownName}: </strong>
            {data[detailKey]}
          </div>
        );
    } catch (e) {
      return;
    }
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
        <div id="Title">
          <h1>{data.title}</h1>
        </div>
        {GetAliasesList(data.aliases)}
        <div>
          <PersonAvatar>{data.images}</PersonAvatar>
        </div>
        {AddDetail(data, "publication", "Publication")}
        {AddDetail(data, "warning_message", "Warning Message")}
        {AddDetail(data, "url", "URL")}
        {AddDetail(data, "weight_min", "Weight min")}
        {AddDetail(data, "weight_max", "Weight max")}
        {AddDetail(data, "height_min", "Height min")}
        {AddDetail(data, "height_max", "Height max")}
      </div>
    </div>
  );
}

export default DetailedPerson;
