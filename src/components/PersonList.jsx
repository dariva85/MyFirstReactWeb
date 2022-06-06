import { useState, useEffect, React } from "react";
import axios from "axios";
import Person from "./Person.jsx";
import { NavLink } from "react-router-dom";

function PersonList() {
  const [data, setData] = useState({ items: [] });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const results = await axios("https://api.fbi.gov/wanted/v1/list", {
        params: { page: page },
      });
      const result = { items: data.items.concat(results.data.items) };
      setData(result);
      return () => {
        setData([]);
      };
    };

    getData();

    return () => {};
  }, [page]);

  return (
    <div>
      <ul>
        {data.items.map((item) => (
          <li className="ListPerson" key={item.title}>
            <Person>{item}</Person>
          </li>
        ))}
      </ul>
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
