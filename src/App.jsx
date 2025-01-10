import {Routes, Route} from "react-router-dom";
import { Home, About, Events, HallOfFamers, Admin, SignIn } from "./pages/index";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/hall-of-famers" element={<HallOfFamers />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Protected Route using information from context */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App
