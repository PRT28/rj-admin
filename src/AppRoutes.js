import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import User from "./components/User.js";
import Slider from "./components/Sidebar/Slider.js";
// Auth Components
import Login from "./components/Auth/Login.js";
// Dashboard Components
import Dashboard from "./components/Dashboard/Dashboard.js";
// Category Components
import Category from "./components/Category/Category.js";
import AddCategory from "./components/Category/AddCategory.js";
// Keyword Components
import Keyword from "./components/Keyword/Keyword.js";
import AddKeyword from "./components/Keyword/AddKeyword.js";
// Joy Components
import AddJoy from "./components/Joy/AddJoy.js";
import AddJoyType from "./components/Joy/AddJoyType.js";
import ManageJoy from "./components/Joy/ManageJoy.js";
// Puzzle Components
import AddPuzzle from "./components/Puzzle/AddPuzzle.js";
import ManagePuzzle from "./components/Puzzle/ManagePuzzle.js";
// Commitment Components
import Commitment from "./components/Commitment/Commitment.js";
// Setting Components
import AboutUs from "./components/Setting/AboutUs.js";
import FAQ from "./components/Setting/FAQ.js";
import TermsCondition from "./components/Setting/TermsConditions.js";
import Application from "./components/Setting/Application.js";
// Statement Components
import Statement from "./components/Statement/Statement.js";
// Report Components
import Report from "./components/Report/Report.js";
// Wack Components
import AddWhack from "./components/Whack/AddWhack.js";
import ManageWhack from "./components/Whack/ManageWhack.js";
import AddWhackType from "./components/Whack/AddWhackType.js";
import EditData from "./components/EditData.js";

const Routes1 = () => {
  console.log('123')
  return (
    <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Slider />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/editdata" element={<EditData/>}/>
            <Route path="/user" element={<User />} />
            <Route path="/category" element={<Category />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/keyword" element={<Keyword />} />
            <Route path="/addkeyword" element={<AddKeyword />} />
            <Route path="/joy/add" element={<AddJoy />} />
            <Route path="/joy/manage" element={<ManageJoy />} />
            <Route path="/joy/add/type" element={<AddJoyType />} />
            <Route path="/whack/add" element={<AddWhack />} />
            <Route path="/whack/manage" element={<ManageWhack />} />
            <Route path="/whack/add/type" element={<AddWhackType />} />
            <Route path="/puzzle/add" element={<AddPuzzle />} />
            <Route path="/puzzle/manage" element={<ManagePuzzle />} />
            <Route path="/commitment" element={<Commitment />} />
            <Route path="/statement" element={<Statement />} />
            <Route path="/report" element={<Report />} />
            <Route path="/setting/application" element={<Application />} />
            <Route path="/setting/faq" element={<FAQ />} />
            <Route path="/setting/about" element={<AboutUs />} />
            <Route path="/setting/termscondition" element={<TermsCondition />} />
          </Route>
        </Routes>
    </HashRouter>
  );
};
export default Routes1;
