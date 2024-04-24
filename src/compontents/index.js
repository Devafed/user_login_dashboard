import Dashboard from "./dashboard/index.js";
import Sidebar from "./sidebar/index.js";
import "./dashboard/style.css";

export default function MainPage() {
  return (
    <div className="container">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
