// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Home page showing all movies */}
          <Route path="/" element={<HomePage />} />

          {/* Booking page for a specific movie */}
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
