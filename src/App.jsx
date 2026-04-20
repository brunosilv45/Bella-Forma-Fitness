import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Collection from "@/pages/Collection";
import About from "@/pages/About";
import WholesalePage from "@/pages/WholesalePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/colecao" element={<Collection />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/atacado" element={<WholesalePage />} />
      </Route>
    </Routes>
  );
}
