import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ProjectDetail from "./pages/ProjectDetail";
import Upload from "./pages/Upload";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
