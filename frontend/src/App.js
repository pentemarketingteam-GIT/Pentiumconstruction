import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/sop/Layout";
import PlayLauncher from "@/components/sop/PlayLauncher";

import Home from "@/pages/sop/Home";
import Parents from "@/pages/sop/Parents";
import HolidayCamps from "@/pages/sop/HolidayCamps";
import ClubsParents from "@/pages/sop/ClubsParents";
import SportsClasses from "@/pages/sop/SportsClasses";
import HowToBook from "@/pages/sop/HowToBook";
import Faqs from "@/pages/sop/Faqs";

import Schools from "@/pages/sop/Schools";
import PEProvision from "@/pages/sop/PEProvision";
import SwimEd from "@/pages/sop/SwimEd";
import GameSetMaths from "@/pages/sop/GameSetMaths";
import ExtraCurricular from "@/pages/sop/ExtraCurricular";
import Tournaments from "@/pages/sop/Tournaments";
import ClubsSchools from "@/pages/sop/ClubsSchools";

import About from "@/pages/sop/About";
import Team from "@/pages/sop/Team";
import Contact from "@/pages/sop/Contact";
import Explore from "@/pages/sop/Explore";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <PlayLauncher />
        <Routes>
          {/* Dynamic AI-interactive website (full screen) */}
          <Route path="/explore" element={<Explore />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            {/* Parents journey */}
            <Route path="/parents" element={<Parents />} />
            <Route path="/parents/holiday-camps" element={<HolidayCamps />} />
            <Route path="/parents/clubs" element={<ClubsParents />} />
            <Route path="/parents/sports-classes" element={<SportsClasses />} />
            <Route path="/parents/how-to-book" element={<HowToBook />} />
            <Route path="/parents/faqs" element={<Faqs />} />

            {/* Schools journey */}
            <Route path="/schools" element={<Schools />} />
            <Route path="/schools/pe" element={<PEProvision />} />
            <Route path="/schools/swim-ed" element={<SwimEd />} />
            <Route path="/schools/game-set-maths" element={<GameSetMaths />} />
            <Route path="/schools/extra-curricular" element={<ExtraCurricular />} />
            <Route path="/schools/tournaments" element={<Tournaments />} />
            <Route path="/schools/clubs" element={<ClubsSchools />} />

            {/* About & Contact */}
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
