import { useState } from "react";
import ListAvailableBooks from "./component/ListAvailableBooks";
import BookAvailableSeniorList from "./component/BookAvailableSeniorList";
import Login from "./component/Login";
import MainPage from "./component/MainPage";
import AddotherBooks from "./component/AddotherBooks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeniorRegistration from "./component/SeniorRegistration";
import JuniorRegistration from "./component/JuniorRegistration";
import SeniorLogin from "./component/SeniorLogin";
import JuniorLogin from "./component/JuniorLogin";
import SeniorSite from "./sites.js/SeniorSite";
function App() {
  return (
    <Router>
      <Routes>
        // <Route path="/" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/senior_registration" element={<SeniorRegistration />} />
        <Route path="/junior_registration" element={<JuniorRegistration />} />
        <Route path="/seniorLogin" element={<SeniorLogin />} />
        <Route path="/juniorLogin" element={<JuniorLogin />} />
        <Route path="/listavailablebooks" element={<ListAvailableBooks />} />
        <Route path="/bookavailable" element={<BookAvailableSeniorList />} />
        <Route path="/addotherbooks" element={<AddotherBooks />} />
        <Route path="/seniorsite" element={<SeniorSite />} />
      </Routes>
    </Router>
  );
}

export default App;
