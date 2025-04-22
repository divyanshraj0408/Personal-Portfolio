import { Route, Routes, BrowserRouter } from "react-router-dom";

import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Work from "./pages/Work";
import Info from "./pages/Info";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<Work />} />
          <Route path="/info" element={<Info />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
