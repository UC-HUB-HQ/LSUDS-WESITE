import {Routes, Route} from "react-router-dom";
import { Home, About, Events, HallOfFamers, Admin } from "./pages/index";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/hall-of-famers" element={<HallOfFamers />} />
      {/* Protected Route using information from context */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App
