import { useState, useEffect, React } from "react";
import axios from "axios";
import Person from "./Person.jsx";
import { NavLink } from "react-router-dom";
import { getPersonsOnListByFilter, getPersonsOnListByPage } from "./Api.js";

function PersonList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const loadPersonsOnList = async () => {
    let persons = [];

    if (filter !== "") {
      persons = await await getPersonsOnListByFilter(filter);
      setPage(1);
    } else {
      persons = await await getPersonsOnListByPage(page);
      if (page > 1) persons = data.concat(persons);
    }
    console.log(filter);
    console.log(persons);
    setData(persons);
  };

  const GetListItems = () => {
    return data.map((item) => (
      <div className="ListPerson" key={item.title}>
        <Person>{item}</Person>
      </div>
    ));
  };

  const AddShowMoreButton = () => {
    if (filter === "")
      return (
        <button
          id="btnShowMore"
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Show more
        </button>
      );
  };

  useEffect(() => {
    loadPersonsOnList();
  }, [page, filter]);

  return (
    <div>
      <div id="InputFilterPos">
        <div id="InputFilter">
          <input
            id="InputCtrl"
            type="text"
            name="name"
            placeholder="Search"
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          />
        </div>
      </div>
      <div id="PersonList">{GetListItems()}</div>
      <div id="ShowMore">{AddShowMoreButton()}</div>
    </div>
  );
}

export default PersonList;
