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
import Admin from "./components/pages/Admin";
import Grant from "./components/pages/Grant";
import Chat from "./components/pages/Chat";
import { SelectedUidProvider } from './contexts/SelectedUidContext';

function App() {
  return (
    <>
      <SigninProvider>
        <SelectedUidProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/MissionMatch/" exact element={<Home />}></Route>
            <Route path="/MissionMatch/services" element={<Services />}></Route>
            <Route path="/MissionMatch/explore" element={<Explore />}></Route>
            <Route path="/MissionMatch/sign-up" element={<SignUp />}></Route>
            <Route
              path="/MissionMatch/application"
              element={<Application />}
            ></Route>
            <Route path="/MissionMatch/profile" element={<Profile />}></Route>
            <Route path="/MissionMatch/contact" element={<Contact />}></Route>
            <Route path="/MissionMatch/admin" element={<Admin />}></Route>
            <Route path="/MissionMatch/grant" element={<Grant />}></Route>
            <Route path="/MissionMatch/chat" element={<Chat />}></Route>
          </Routes>
          <Footer></Footer>
        </Router>
        </SelectedUidProvider>
      </SigninProvider>
    </>
  );
}

export default App;
