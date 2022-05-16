import './App.css';
import { Routes, Route } from "react-router-dom";
import Contact from './Contact';

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
