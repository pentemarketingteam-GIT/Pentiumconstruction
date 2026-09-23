import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PentiumLauncher from "@/components/pentium/PentiumLauncher";
import Shell from "@/pages/pentium/Shell";
import Advisor from "@/pages/pentium/Advisor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <PentiumLauncher />
        <Routes>
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/" element={<Shell />} />
          <Route path="*" element={<Shell />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
