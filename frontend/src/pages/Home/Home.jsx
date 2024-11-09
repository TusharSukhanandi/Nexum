import React from "react";
import RandomIcons from "../../componants/RandomIcons";
import Header from "../../componants/Header";
import Background from "../../componants/Background";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <Background>
     <Header height={"h-[20dvh]"} />
      <main className="animate-fadeIn w-full h-[50dvh] md:h-[60dvh] flex flex-col md:flex-row justify-center items-center relative">
        <div className="w-80 h-80 absolute z-10 bg-purple-950 rounded-full blur-[150px]"></div>
        <div className="z-20 flex font-mukta items-center justify-center gap-2 flex-col ">
          <h6 className="text-white text-2xl">
            Connect any where in the world
          </h6>
          <h2 className="text-white text-2xl">in real-time with</h2>
          <h1 className="text-purple-800 mt-2 font-lobster text-6xl">Nexum</h1>
          <Link to={"/login"}>
            <button
              className="transition duration-1000 text-white text-lg px-4 py-3 mt-6 border-2  font-medium border-purple-800 rounded-2xl hover:text-purple-950 hover:bg-white hover:border-white active:-scale-90"
            >
              Get started
            </button>
          </Link>
        </div>
      </main>
      <div className="animate-fadeIn">
        <RandomIcons
          position={{
            top: "40vh",
            right: "0",
            width: "15%",
            height: "30vh",
            color: "purple",
          }}
        />
        <RandomIcons
          position={{
            top: "40vh",
            left: "0",
            width: "15%",
            height: "30vh",
            color: "purple",
          }}
        />
        <RandomIcons
          position={{
            top: "60dvh",
            width: "90%",
            height: "30dvh",
            color: "purple",
          }}
        />
        {/* <RandomIcons position={{ top: "0", width: "100%", height: "20vh" , color: 'white', }} /> */}
      </div>
    </Background>
  );
};

export default Home;
