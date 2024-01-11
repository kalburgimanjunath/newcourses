import "./styles.css";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Courses from "./pages/courses";
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/course/:id" element={<Courses />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </div>
  );
}
