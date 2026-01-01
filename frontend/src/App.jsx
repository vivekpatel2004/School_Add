import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddSchool from "./pages/addSchool";
import ShowSchool from "./pages/ShowSchool";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddSchool />} />
        <Route path="/schools" element={<ShowSchool />} />
      </Routes>
    </BrowserRouter>
  );
}
