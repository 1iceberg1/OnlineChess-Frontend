import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SessionPage } from "./pages/sessionpage";
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SessionPage />} />
        </Routes>
      </BrowserRouter>
    </>    
  );
}

export default App;
