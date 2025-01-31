import React from "react";

function getFormatedTime(time) {
  if (!time) {
    return null;
  }
  let readableDateAndTimeFormate = new Date(time)
    .toLocaleTimeString()
    .split(":");

  let hour = +readableDateAndTimeFormate[0];
  

  if (hour == 0) hour = 12;
  
  if (hour > 12) {
    hour = hour - 12;
    readableDateAndTimeFormate[0] = hour;
    delete readableDateAndTimeFormate[2];
    let formatedTime =
      readableDateAndTimeFormate[0] + ":" + readableDateAndTimeFormate[1];
    return formatedTime + " am";
  } else {
    let formatedTime =
      hour + ":" + readableDateAndTimeFormate[1];
    return formatedTime + " pm";
  }
}

const Message = ({ message, isSent, time }) => {
  let formatedTime = getFormatedTime(time);
 
  return (
    <>
      {/* sent and recived message color */}
      <div
        className={`${isSent ? "bg-[#CDBEA8] text-black" : "bg-[#6E473B] text-white border-2 border-[#6E473B]"} border-2 border-[#CDBEA8] flex flex-col  max-w-[75%] break-words font-poppins p-[10px] px-4 m-1 mb-2 rounded-3xl`}
        // className={`bg-purple-600 border-2 border-purple-900 flex flex-col text-white max-w-[75%] break-words font-poppins p-[10px] px-4 m-1 mb-2 rounded-3xl`}
      >
        <h4>{message}</h4>
        <span
          className={`text-xs ${
            isSent ? " text-right text-gray-700" : "text-left text-gray-400"
          }`}
        > 
          {formatedTime}
        </span>
      </div>
    </>
  );
};

export default Message;
