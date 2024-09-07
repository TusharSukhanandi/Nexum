import { FaMessage } from "react-icons/fa6";
import { LuMessagesSquare } from "react-icons/lu";
import { IoSend } from "react-icons/io5";
import { MdMargin, MdOutlineConnectWithoutContact } from "react-icons/md";
import { FaConnectdevelop } from "react-icons/fa";

const RandomIcons = ({ position }) => {
  const style = {
    padding: "0.25rem",
    fontSize: "1.875rem",
    position: "absolute",
    margin: "25px",
    // background: "green",
    ...position,
  };

  const generateRandomPositions = () => ({
    top: Math.floor(Math.random() * 90) + "%",
    left: Math.floor(Math.random() * 90) + "%",
  });

  return (
    <div style={style}>
      <FaMessage
        style={{
          position: "absolute",
          ...generateRandomPositions(),
        }}
      />
      <LuMessagesSquare
        style={{
          position: "absolute",
          ...generateRandomPositions(),
        }}
      />
      <IoSend
        style={{
          position: "absolute",
          ...generateRandomPositions(),
        }}
      />

      <FaConnectdevelop
        style={{
          position: "absolute",
          ...generateRandomPositions(),
        }}
      />
     
      <MdOutlineConnectWithoutContact
        style={{
          position: "absolute",
          ...generateRandomPositions(),
        }}
      />
    </div>
  );
};

export default RandomIcons;
