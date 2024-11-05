import { useState } from "react";
import ListAvailableBooks from "./component/ListAvailableBooks";
import BookAvailableSeniorList from "./component/BookAvailableSeniorList";
import Login from "./component/Login";
import MainPage from "./component/MainPage";
import AddotherBooks from "./component/AddotherBooks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/listavailablebooks" element={<ListAvailableBooks />} />
        <Route path="/bookavailable" element={<BookAvailableSeniorList />} />
        <Route path="/addotherbooks" element={<AddotherBooks />} />
      </Routes>
    </Router>
  );
}

export default App;
