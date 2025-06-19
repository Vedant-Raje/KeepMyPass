import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[81vh] ">
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#4ade80",
                color: "#000",
              },
            },
          }}
        />

        <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
