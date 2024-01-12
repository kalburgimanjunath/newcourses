import "./styles.css";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Courses from "./pages/courses";
import Header from "./components/header";
import Posts from "./pages/posts";
import Receipe from "./pages/receipe";
import Landing from "./pages/landing";
import Main from "./pages/main";
export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="mt-20 text-center items-center">
        <Routes>
          <Route path="/landing/:id" element={<Landing />} />
          <Route path="/receipe/:id" element={<Receipe />} />
          <Route path="/posts/:id" element={<Posts />} />
          <Route path="/course/:id" element={<Courses />} />
          <Route path="/all" exact element={<Home />} />
          <Route path="/" exact element={<Main />} />
        </Routes>
      </div>
    </div>
  );
}
