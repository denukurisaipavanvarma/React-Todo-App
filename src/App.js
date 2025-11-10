import "./css/main.css";
import DisplayTodos from "./components/DisplayTodos";
import Todos from "./components/Todos";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


function App() {
const [theme ,setTheme]= useState("light");

useEffect(()=>{
const savedTheme =localStorage.getItem("app-theme");
if(savedTheme)setTheme(savedTheme);
},[]);

useEffect(()=>{
document.documentElement.setAttribute("data-theme",theme);
localStorage.setItem("app-theme",theme);},[theme]);

// 🌗 Step 4: Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className="App">
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        Todo App
      </motion.h1>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Todos />
        <DisplayTodos />
      </motion.div>
    </div>
  );
}

export default App;
