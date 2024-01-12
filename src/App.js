import "./styles.css";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Courses from "./pages/courses";
import Header from "./components/header";
import Posts from "./pages/posts";
import Main from "./pages/main";
export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/posts/:id" element={<Posts />} />
        <Route path="/course/:id" element={<Courses />} />
        <Route path="/all" exact element={<Home />} />
        <Route path="/" exact element={<Main />} />
      </Routes>
    </div>
  );
}
