import React, { createContext, useState, useContext } from "react";
import Toast from "../componants/Toast";

const ToastContext = createContext();


const useToastContext = () => useContext(ToastContext)


const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
      message: "",
      type: "info",
      isOpen: false,
  });

  const showToast = (
    message,
    type = "info",
    duration = 4000,
    autoClose = true,
  ) => {
    setToast({message, type, isOpen:true,  duration, autoClose});

    if(autoClose){
        setTimeout(() => {
            hideToast()
        }, duration + 1000)
    }
  };

  const hideToast = () => {
    setToast({...Toast, isOpen: false})
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
     {toast.isOpen && (
        <Toast
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          autoClose={toast.autoClose}
        />
    ) }
    
    </ToastContext.Provider>
  );
};

export { useToastContext , ToastProvider };
