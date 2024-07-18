// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/loginPage";
import Header from "./views/header/header";
import Dashboard from "./views/dashboard";
import Check from "./views/check";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

function App() {
  return (
    <>
      <ReactNotifications />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Header />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Check" element={<Check />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
