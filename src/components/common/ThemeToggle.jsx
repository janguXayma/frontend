import React, { useEffect } from 'react'

const ThemeToggle = () => {
    const toggleTheme = () =>{
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(()=>{
        const storedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', storedTheme);
    },[])
  return (
    <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
      Light🌙 / Night☀️
    </button>
  )
}

export default ThemeToggle

// src/components/ThemeToggle.jsx
// import React, { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <button onClick={toggleTheme} className="btn btn-sm btn-outline">
//       {theme === "light" ? "🌙 Mode Sombre" : "☀️ Mode Clair"}
//     </button>
//   );
// }

