import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonList from "./components/PersonList";
import DetailedPerson from "./components/DetailedPerson";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PersonList></PersonList>} />
        <Route
          path="/Person/:personId"
          element={<DetailedPerson></DetailedPerson>}
        />
      </Routes>
    </Router>
  );
}

export default App;
