import React, { useState } from "react";
import Footer from "./componenets/Footer/Footer";
import NavBar from "./componenets/NavBar";
import LandingPage from "./screens/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Archive from "./screens/Archive";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CreateDeet from "./screens/CreateDeet";
import SingleDeet from "./screens/SingleDeet";


const App = () => {

  const [search, setSearch] = useState("")
  
  return(
  <BrowserRouter>
    <NavBar setSearch={setSearch} />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/archive" element={<Archive search={search} />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/createdeet" element={<CreateDeet />} />
        <Route path="/:id" element={<SingleDeet />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);}

export default App;
