import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Store from "./pages/Store";
import OrderHistory from "./pages/Order History";
import Browse from "./pages/Browse";
import Likes from "./pages/Likes";
import Cards from "./pages/cards";
import Profile from "./pages/Profile";
import Fulcontent from "./pages/Fulcontent";

function App() {
 
  return (
    <Router>
      <Layout >
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/store" element={<Store />} />
          <Route path="/order" element={<OrderHistory />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/cart" element={<Cards />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/full" element={<Fulcontent />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
