import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Person from "./components/Person.jsx";

function App() {
  const [data, setData] = useState({ items: [] });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      console.log("waiting api");
      const results = await axios("https://api.fbi.gov/wanted/v1/list", {
        params: { page: page },
      });
      const result = { items: data.items.concat(results.data.items) };
      setData(result);
      console.log(page);
      return () => {
        setData([]);
      };
    };

    getData();

    return () => {
      console.log("cleaning");
    };
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

export default App;
