import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/page";
import RegisterPage from "./register/page";
import CheckListPage from "./checklist/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checklist" element={<CheckListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
