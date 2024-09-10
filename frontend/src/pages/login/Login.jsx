import Background from "../../componants/Background";
import Header from "../../componants/Header";
import RandomIcons from "../../componants/RandomIcons";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import useLogIn from "../../hooks/useLogIn";
import Toast from "../../componants/Toast";

const Login = () => {
  
  const [isRandomizeIconsMounted, setIsRandomizeIconsMounted] = useState(false)
  const {logIn} = useLogIn()

  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  })

  const handleLogin = () => {
    console.log(inputs)
    logIn(inputs)
  }
    
  const memoizedRandomIcons = useMemo(() => {
    return (
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
      </div>
    );
  }, []); 


  return (
    <Background>
      <Header />

      <div className="md:w-1/3 z-10 relative animate-fadeIn w-full bg-transparent h-auto md:m-auto mt-10 flex flex-col gap-7 p-10">
        <h1 className="text-center text-white text-4xl">Log-in</h1>
        <div className="w-[90%] mx-auto ">
          <input
            type="text"
            placeholder="User name"
            value={inputs.userName}
            onChange={(e) => setInputs({...inputs, userName: e.target.value})}
            className="w-full p-3 text-white text-center border-b-2 border-purple-500 rounded-lg bg-transparent active:border-purple-800"
          />
        </div>
        <div className="w-[90%] mx-auto">
          <input
            type="Password"
            placeholder="Password"
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
            className="w-full p-3 text-white text-center border-b-2 border-purple-500 rounded-lg bg-transparent active:border-purple-800"
          />
        </div>
        <div className="text-white w-[90%}">
         <Link to={"/signup"}> <h4 className="text-center">create new account</h4></Link>
        </div>
        <div className="w-[90%] mx-auto mt-3">
        <button onClick={handleLogin} className="z-50 transition w-auto m-auto block duration-1000 text-white text-center text-s px-5 py-2 border-2 font-medium border-purple-800 rounded-2xl hover:text-purple-950 hover:bg-white hover:border-white active:scale-50">
              Log-in
            </button>
        </div>
      </div>
      {memoizedRandomIcons}
    </Background>
  );
};

export default Login;
