import Background from "../../componants/Background";
import Header from "../../componants/Header";
import RandomIcons from "../../componants/RandomIcons";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import useVerifyOtp from "../../hooks/useVerifyOtp";
import useSignUp from "../../hooks/useSignUp";
import { AiOutlineEye , AiOutlineEyeInvisible  } from "react-icons/ai";

const Signup = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    otp: 0,
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const { verifyEmail, loadingFromEmail } = useVerifyEmail();
  const { verifyOtp, loadingFromOtp } = useVerifyOtp();
  const { signUp, loadingFromSignUp } = useSignUp();

  const hadnleSignIn = async () => {
    if (!isOtpSent && !isOtpCorrect) {
      const result = await verifyEmail(inputs.email);

      if (result) {
        return setIsOtpSent(true);
      }
    }
    if (isOtpSent && !isOtpCorrect) {
      const result = await verifyOtp({
        email: inputs.email,
        otp: inputs.otp,
        resensOtp: inputs.resensOtp,
      });
      if (result) {
        return setIsOtpCorrect(true);
      }
    }
    if (isOtpCorrect) {
      const result = await signUp({
        userName: inputs.userName,
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
        email: inputs.email,
      });
    }
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
      <div className="md:w-1/3 z-10 relative animate-fadeIn w-full bg-transparent h-auto md:m-auto mt-10 flex flex-col gap-5 p-10">
        <h5 className="text-center text-white text-4xl font-mukta">Sign-up</h5>

        {!isOtpSent && !isOtpCorrect ? (
          <div className="w-[90%] my-5 mx-auto ">
            <input
              type="email"
              placeholder="email"
              className="w-full p-3 text-white text-center border-b-2 border-purple-500 rounded-lg bg-transparent active:border-purple-800 placeholder:font-poppins"
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
        ) : null}
        {isOtpSent && !isOtpCorrect ? (
          <>
            <div className="w-[90%] my-5 mx-auto ">
              <input
                type="number"
                placeholder="Otp"
                className="w-full p-3 text-white text-center border-b-2 border-purple-500 rounded-lg bg-transparent active:border-purple-800 placeholder:font-poppins"
                onChange={(e) => setInputs({ ...inputs, otp: e.target.value })}
              />
              <h5
                onClick={() => setInputs({ ...inputs, resensOtp: true })}
                className="text-white mt-5 -mb-5 text-center font-poppins"
              >
                resend
              </h5>
            </div>
          </>
        ) : null}

        {isOtpCorrect ? (
          <>
            <div className="w-[90%] mx-auto ">
              <input
                type="text"
                placeholder="User name"
                className="w-full p-3 text-white text-center border-b-2 border-purple-500 rounded-lg bg-transparent active:border-purple-800 placeholder:font-poppins"
                onChange={(e) =>
                  setInputs({ ...inputs, userName: e.target.value })
                }
              />
            </div>
            <div className="w-[90%] relative mx-auto">
              <input
                type={showPassword ? "text" : "Password"}
                placeholder="Password"
                className="w-full p-3 text-white text-center border-b-2 border-purple-500 rounded-lg bg-transparent active:border-purple-800 placeholder:font-poppins"
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
              <div
                className="text-white absolute top-1/2 -translate-y-1/2 right-5 sm:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
               {!showPassword ? <AiOutlineEye  /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
            <div className="w-[90%] mx-auto">
              <input
                type="Password"
                placeholder="Confirm Password"
                className="w-full p-3 text-white text-center border-b-2 border-purple-500 rounded-lg bg-transparent active:border-purple-800 placeholder:font-poppins"
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
          </>
        ) : null}

        <div className="text-white w-[90%}">
          <Link to={"/login"}>
            <h1 className="text-center font-poppins">
              already have an account?
            </h1>
          </Link>
        </div>
        <div className="w-[90%] mx-auto mt-3">
          <button
            onClick={hadnleSignIn}
            className="w-24 h-12 z-50 m-auto duration-700 flex gap-2 justify-center items-center text-white text-center text-s border-2 font-medium border-purple-800 rounded-2xl hover:text-purple-950 hover:bg-white hover:border-white active:scale-50"
            disabled={loadingFromEmail || loadingFromOtp || loadingFromSignUp}
          >
            {loadingFromEmail || loadingFromOtp || loadingFromSignUp ? (
              <Loading />
            ) : isOtpCorrect ? (
              "sign up"
            ) : (
              "validate"
            )}
          </button>
        </div>
      </div>

      {memoizedRandomIcons}
    </Background>
  );
};

const Loading = () => {
  return <div className="w-4 h-4 bg-purple-500 rounded-md animate-spin"></div>;
};

export default Signup;
