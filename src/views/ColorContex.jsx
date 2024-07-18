import React, { createContext, useState, useContext } from "react";

const ColorContext = createContext();

export function useColor() {
  return useContext(ColorContext);
}

export function ColorProvider({ children }) {
  const [backgroundColor, setBackgroundColor] = useState(
    "bg-gradient-to-br from-NanoBGcolor1 via-NanoBGcolor2 to-NanoBGcolor3"
  ); // Default color

  const value = {
    backgroundColor,
    setBackgroundColor,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}
