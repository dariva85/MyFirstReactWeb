import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({ items: [] });

  useEffect(() => {
    const getData = async () => {
      console.log("waiting api");
      const results = await axios("https://api.fbi.gov/wanted/v1/list");
      console.log(results.data);
      setData(results.data);
    };

    getData();

    return () => {
      console.log("cleaning");
    };
  }, []);

  return (
    <div>
      <ul>
        {data.items.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
