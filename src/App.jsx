import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import SignUp from "./components/pages/SignUp";
import Footer from "./components/Footer";
import Explore from "./components/pages/Explore";
import Application from "./components/pages/Application";
import Profile from "./components/pages/Profile";

import { SigninProvider } from "./contexts/SigninContext";
import Contact from "./components/pages/Contact";

function App() {
  return (
    <>
      <SigninProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/MissionMatch/" exact element={<Home />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/application" element={<Application />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
          </Routes>
          <Footer></Footer>
        </Router>
      </SigninProvider>
    </>
  );
}

export default App;
