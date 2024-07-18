import React, { useState, useRef, useEffect } from "react";
import { RiPaintFill } from "react-icons/ri";

const gradients = [
  { name: "Lava Red", value: "bg-gradient-to-r from-red-600 to-orange-600" },
  {
    name: "Peach Brûlée",
    value: "bg-gradient-to-r from-[#FFDAB9] to-[#FFB6A3]",
  },
  {
    name: "Spiced Orange",
    value: "bg-gradient-to-r from-orange-400 to-orange-600",
  },
  {
    name: "Canopy Green",
    value: "bg-gradient-to-r from-green-400 to-green-600",
  },
  { name: "Ocean Blue", value: "bg-gradient-to-r from-blue-400 to-blue-600" },
  { name: "Serious Teal", value: "bg-gradient-to-r from-teal-500 to-teal-700" },
  {
    name: "Polished Blue",
    value: "bg-gradient-to-r from-blue-300 to-blue-500",
  },
  {
    name: "Elevated Purple",
    value: "bg-gradient-to-r from-purple-400 to-purple-600",
  },
  {
    name: "Space Purple",
    value: "bg-gradient-to-r from-purple-600 to-indigo-800",
  },
  { name: "Stone Gray", value: "bg-gradient-to-r from-gray-400 to-gray-600" },
];
const colors = [
  { name: "Soft Sky", value: "bg-[#E6F3FF]" },
  { name: "Mint Breeze", value: "bg-[#E0F5E9]" },
  { name: "Lavender Mist", value: "bg-[#F0E6FF]" },
  { name: "Peach Whisper", value: "bg-[#FFE6D5]" },
  { name: "Lemon Chiffon", value: "bg-[#FFF9C4]" },
  { name: "Lilac Haze", value: "bg-[#E6D9FF]" },
  { name: "Misty Rose", value: "bg-[#FFE4E1]" },
  { name: "Pale Pistachio", value: "bg-[#E0F0D5]" },
  { name: "Baby Blue", value: "bg-[#D9EEFF]" },
  { name: "Sky Blue", value: "bg-[#87CEEB]" },
  { name: "Mint Green", value: "bg-[#98FF98]" },
  { name: "Coral", value: "bg-[#FF7F50]" },
  { name: "Lavender", value: "bg-[#E6E6FA]" },
  { name: "Pale Turquoise", value: "bg-[#AFEEEE]" },
  { name: "Navy Blue", value: "bg-[#000080]" },
  { name: "Forest Green", value: "bg-[#228B22]" },
  { name: "Burgundy", value: "bg-[#800020]" },
  { name: "Dark Purple", value: "bg-[#301934]" },
  { name: "Charcoal", value: "bg-[#36454F]" },
  { name: "Deep Teal", value: "bg-[#004D4D]" },
  { name: "Maroon", value: "bg-[#800000]" },
  { name: "Midnight Blue", value: "bg-[#191970]" },
  { name: "Dark Olive", value: "bg-[#556B2F]" },
  { name: "Eggplant", value: "bg-[#614051]" },
  { name: "Deep Brown", value: "bg-[#5C4033]" },
  { name: "Dark Slate Gray", value: "bg-[#2F4F4F]" },
  { name: "Dark Crimson", value: "bg-[#8B0000]" },
  { name: "Deep Sea Green", value: "bg-[#006400]" },
  { name: "Dark Indigo", value: "bg-[#4B0082]" },
];

function ColorPickerModal({ onColorChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedGradients, setSelectedGradients] = useState(null);

  const handleColorClick = (colorClass) => {
    onColorChange(colorClass);
    setSelectedColor(colorClass);
    setSelectedGradients(colorClass);
    setIsOpen(false);
  };

  const handleRest = () => {
    onColorChange(
      "bg-gradient-to-br from-NanoBGcolor1 via-NanoBGcolor2 to-NanoBGcolor3"
    );
    localStorage.removeItem("selectedColour");
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Add event listener when the modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const ColorSwatch = ({ color, onClick, isSelected }) => (
    <div
      onClick={() => onClick(color.value)}
      className={`relative w-full h-6 cursor-pointer ${
        color.value
      } rounded transition-all duration-200 hover:border-2 hover:border-gray-600 group  ${
        isSelected ? "border-2 border-blue-700" : ""
      }`}
      title={color.name}
    ></div>
  );

  return (
    <div className="relative">
      <RiPaintFill
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl cursor-pointer"
      />
      {isOpen && (
        <div
          className="absolute top-10 z-10	 left-0 w-64 bg-white border border-gray-300 rounded shadow-lg p-4"
          ref={modalRef}
        >
          <h2 className="text-lg font-bold mb-2 text-black">
            Dashboard Background
          </h2>

          <h3 className="font-semibold mb-2 text-black">Gradients</h3>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {gradients.map((gradient) => (
              <ColorSwatch
                key={gradient.name}
                color={gradient}
                onClick={handleColorClick}
                isSelected={selectedGradients == gradient.value}
              />
            ))}
          </div>

          <h3 className="font-semibold mb-2 text-black">Colors</h3>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <ColorSwatch
                key={color.name}
                color={color}
                onClick={handleColorClick}
                isSelected={selectedColor == color.value}
              />
            ))}
          </div>
          <button
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
            onClick={handleRest}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default ColorPickerModal;
