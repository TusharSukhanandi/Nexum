import React, { useEffect, useState } from "react";

const Toast = ({  message, type, duration, autoClose}) => {
  const [isOpen, setIsOpen] = useState(false);
  const typeIcons = {
    error: "❌",
    warning: "⚠️",
    success: "✅",
    loading: "⏳",
    info: "ℹ️",
  };

  const typeColors = {
    error: "bg-red-500",
    warning: "bg-yellow-500",
    success: "bg-green-500",
    loading: "bg-blue-500",
    info: "bg-gray-500",
  };

  useEffect(() => {
    setIsOpen(true);

    let timer;

    if(autoClose){
      timer = setTimeout(() => {
        setIsOpen(false);
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [duration, autoClose]);

  return (
    <>
      <div
        className={`fixed flex justify-around border-black border-2 transition-all text-center duration-500 transform left-1/2 w-[90%] md:w-[30%] py-5 rounded-xl -translate-x-1/2 
            ${typeColors[type]} ${isOpen ? "top-10 " : "-top-24 -scale-50"}`}
      >
        <div>
          {typeIcons[type]} 
        </div>
        <div>
        {message}
        </div>
        <button onClick={() => setIsOpen(false)}></button>
      </div>
    </>
  );
};

export default Toast;
