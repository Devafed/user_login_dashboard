import Router from "./compontents/router/index.js";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./compontents/styles/Satoshi_Complete/Fonts/WEB/css/satoshi.css";
function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
