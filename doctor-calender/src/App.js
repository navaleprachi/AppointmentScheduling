import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Scheduling from "./pages/scheduling";
import UpcomingAppointments from "./pages/upcomingAppointment";
import { persistor } from "./store/store";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    persistor.purge(); // Clear the state when the app is loaded
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scheduling />} />
        <Route path="/upcoming" element={<UpcomingAppointments />} />
      </Routes>
    </Router>
  );
}

export default App;
