import Background from "../../componants/Background";
import Header from "../../componants/Header";
import RandomIcons from "../../componants/RandomIcons";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import useLogIn from "../../hooks/useLogIn";
import { AiOutlineEye , AiOutlineEyeInvisible  } from "react-icons/ai";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { logIn, loading } = useLogIn();

  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault()
    logIn(inputs);
  };

 
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
      <Header height={"h-[20dvh]"} />

      <form className="md:w-1/3 z-10 relative animate-fadeIn w-full bg-transparent h-auto md:m-auto mt-10 flex flex-col gap-7 p-10">
        <h1 className="text-center text-white text-4xl font-mukta">Log-in</h1>
        <div className="w-[90%] mx-auto ">
          <input
            type="text"
            placeholder="User name"
            value={inputs.userName}
            onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
            className="w-full p-3 text-white text-center border-b-2 border-purple-500 rounded-lg bg-transparent active:border-purple-800 placeholder:font-poppins"
          />
        </div>
        <div className="w-[90%] relative mx-auto">
          <input
            type={showPassword ? "text" : "Password"}
            placeholder="Password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            className="w-full p-3 text-white text-center border-b-2 border-purple-500 rounded-lg bg-transparent active:border-purple-800 placeholder:font-poppins"
          />
          <div
            className="text-white text-2xl bg-black absolute top-1/2 -translate-y-1/2 right-5 sm:cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
           {!showPassword ? <AiOutlineEye  /> : <AiOutlineEyeInvisible />}
          </div>
        </div>
        <div className="text-white w-[100%]">
          <Link to={"/signup"}>
            {" "}
            <h4 className="text-center">create new account</h4>
          </Link>
        </div>
        <div className="w-[90%] mx-auto mt-3">
          <button
            type="submit"
            onClick={handleLogin}
            className="w-24 h-12 z-50 m-auto duration-700 flex gap-2 justify-center items-center text-white text-center text-s border-2 font-medium border-purple-800 rounded-2xl hover:text-purple-950 hover:bg-white hover:border-white active:scale-50"
            disabled={loading}
          >
            {loading ? <Loading /> : "log in"}
          </button>
        </div>
      </form>
      {memoizedRandomIcons}
    </Background>
  );
};

const Loading = () => {
  return <div className="w-4 h-4 bg-purple-500 rounded-md animate-spin"></div>;
};

export default Login;
