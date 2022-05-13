import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Details from "./Components/Details";
import HomeComponent from "./Components/HomeComponent";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}
export default App;
