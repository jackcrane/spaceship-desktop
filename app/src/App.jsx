import React, { useState } from "react";
import "./assets/styles/global.css";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <span>asdfdd{isOpen ? "open" : "closed"}</span>;
};

export default App;
