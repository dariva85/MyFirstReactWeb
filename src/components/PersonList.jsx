import { useState, useEffect, React } from "react";
import axios from "axios";
import Person from "./Person.jsx";
import { NavLink } from "react-router-dom";
import { getPersonsOnListByPage } from "./Api.js";

function PersonList() {
  const [data, setData] = useState({ items: [] });
  const [page, setPage] = useState(1);

  const loadPersonsOnList = async () => {
    const personsPerPage = await getPersonsOnListByPage(page);
    const totalPersonOnList = {
      items: data.items.concat(personsPerPage.data.items),
    };

    setData(totalPersonOnList);
  };

  const GetListItems = () => {
    return data.items.map((item) => (
      <li className="ListPerson" key={item.title}>
        <Person>{item}</Person>
      </li>
    ));
  };

  useEffect(() => {
    loadPersonsOnList();
  }, [page]);

  return (
    <div>
      <ul>{GetListItems()}</ul>
      <div id="ShowMore">
        <button
          id="btnShowMore"
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Show more
        </button>
      </div>
    </div>
  );
}

export default PersonList;
