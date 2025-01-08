import "./App.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Terminal from "./components/Terminal";
import Box from "./components/Box";

function App() {
  return (
    <>
      <div>{<Navigation />}</div>
      <div>{<Terminal />}</div>

      {/* <div>{<Box />}</div> */}

      <div>{<Footer />}</div>
    </>
  );
}

export default App;
