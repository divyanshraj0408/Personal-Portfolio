import "./App.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Terminal from "./components/Terminal";

function App() {
  return (
    <>
      <div>{<Navigation />}</div>
      <div>{<Terminal />}</div>
      <div>{<Footer />}</div>
    </>
  );
}

export default App;
