import { Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Events,
  HallOfFamers,
  Admin,
  SignIn,
} from "./pages/index";
import UserProvider from "./context/User";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/hall-of-famers" element={<HallOfFamers />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Route using information from context */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
