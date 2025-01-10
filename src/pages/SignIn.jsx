import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Reveal from "../components/Reveal";

const SignIn = () => {

  const navigate = useNavigate();
  const passwordInput = useRef(null);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const userLogin = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const ErrorContainer = () => {
    return (
      <div className="flex w-[80%] items-center justify-between rounded-lg bg-red-200 px-2 py-4 tab:w-full">
        <p>{errorMessage}</p>
        <i
          onClick={() => setErrorMessage(null)}
          className="bi bi-x cursor-pointer text-6xl"
        ></i>
      </div>
    );
    };
    

  return (
      <section className="flex min-h-full">
        {/*  */}
        <div className="w-[50%] mobile:hidden">
            <div className=" bg-softBlue fixed flex h-full w-[50%] items-center justify-center px-[3em] text-white tab:px-[2em] mobile:hidden">
                <h2 className="text-left text-4xl font-medium leading-[1.5em] tab:text-2xl">Get ready to transform your ideas into reality with cutting-edge AIvalidation at your fingertips.</h2>
            </div>
        </div>
        {/*  */}
        <div className="className= w-[50%] p-[3em] tab:p-[2em] mobile:w-full">
              {/*  */}
            <header>
                <div className="text-redbold mb-4 flex cursor-pointer items-center gap-2 font-semibold" onClick={() => navigate(-1)}>
                    <i className="bi bi-arrow-left text-2xl"></i>
                    <p>Back</p>
                </div>
                <h2 className="text-black001 text-5xl font-medium tab:text-3xl">Sign in</h2>
                <p className="text-grayBlue mt-2 text-lg font-normal">Welcome back, kindly enter your login details</p>
            </header>
            {/*  */}
            <form className="authForm" onSubmit={userLogin} method="post">
                {errorMessage && <ErrorContainer />}
                <div className="inputContainer">
                    <label className="authLabel" htmlFor="email">Email Address:</label>
                    <input className="authInput" onChange={handleChange} name="email" id="email" type="email" required value={loginInfo.email} />
                </div>
                <div className="inputContainer">
                    <label className="authLabel" htmlFor="password">Password:</label>
                    <div className="authPasswordContainer">
                        <input ref={passwordInput} className="authPasswordInput" onChange={handleChange} name="password" id="password" type="password" required value={loginInfo.password}/>
                        <Reveal inputField={passwordInput} />
                    </div>
                </div>
                <div>
                    <button className="authSubmitInput" type="submit" disabled={formSubmitted}>
                        {formSubmitted ? <Loader /> : "Sign in"}
                    </button>
                </div>
            </form>
        </div>
    </section>
  );
};

export default SignIn;
