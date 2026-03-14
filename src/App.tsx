import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* Add other routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
