import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./container/Home/Home";
import Info from "./container/Info/Info";
import Setting from "./container/Setting/Setting";
import DrawerCT from "./components/Drawer/Drawer";
import Login from "./container/Login/Login";
import Breadcrumbs from "./components/breadcrumb/Breadcrumbs";
import Shelve from "./container/Shelve/Shelve";
import { Container } from "react-bootstrap";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Container fluid className="app-container">
        <DrawerCT />
        <div className="content-container">
          <Breadcrumbs />
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Info" element={<Info />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Shelve" element={<Shelve />} />
          </Routes>
        </div>
      </Container>
    </BrowserRouter>
  );
};

export default App;
