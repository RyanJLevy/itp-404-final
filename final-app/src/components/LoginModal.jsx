import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { createUser, findUserByUsernameAndPassword } from "../api/users";
import { useSessionStorage } from "@uidotdev/usehooks";

export default function LoginModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useSessionStorage("userId", -1);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim().length || !password.trim().length) {
      setErrorMessage("Username and password fields must not be empty.");
      return;
    }
    const [user] = await findUserByUsernameAndPassword(username, password);
    if (user) {
      setUserId(user.id);
      props.setIsOpen(false);
    } else {
      setErrorMessage("Couldn't find your ClimbRepo account.");
    }
  };

  const handleCreateAccountSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim().length || !password.trim().length) {
      setErrorMessage("Username and password fields must not be empty.");
      return;
    }
    const user = await createUser({
      username: username,
      password: password,
    });
    setUserId(user.id);
    props.setIsOpen(false);
  };

  const switchModalScreen = () => {
    setIsLogin((prev) => !prev);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="absolute z-[99] top-0 left-0 bottom-0 right-0 min-w-[100vw] min-h-[100vh] bg-black bg-opacity-40 flex justify-center p-40">
      <dialog className="flex flex-col w-[75%] md:w-[55%] lg:w-[35%] bg-background dark:bg-supper-black rounded-md items-center py-8 px-10 md:px-20">
        <div className="flex justify-between items-center w-full mb-6">
          <h1 className="text-3xl">{isLogin ? "Login" : "Create Account"}</h1>
          <button type="button" onClick={() => props.setIsOpen(false)}>
            <FontAwesomeIcon
              className="text-secondary hover:text-dark-secondary"
              icon={faXmarkCircle}
            />
          </button>
        </div>
        {isLogin ? (
          <>
            <form className="flex flex-col w-full" onSubmit={handleLoginSubmit}>
              <label htmlFor="username">Username</label>
              <input
                className="shadow-md shadow-slate-300 border border-slate-300 rounded-md px-4 py-2 my-2"
                id="username"
                type="text"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                className="shadow-md shadow-slate-300 border border-slate-300 rounded-md px-4 py-2 my-2"
                id="password"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="rounded-md text-white bg-primary hover:bg-dark-primary p-4 mt-4"
                type="submit"
              >
                Login
              </button>
              {errorMessage && (
                <p className="text-red-500 my-2">{errorMessage}</p>
              )}
              <div className="flex justify-center items-center space-x-1 mt-4">
                <p>Don't have an account?</p>
                <button
                  className="text-secondary hover:text-dark-secondary font-bold"
                  type="button"
                  onClick={switchModalScreen}
                >
                  Create one!
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <form
              className="flex flex-col w-full"
              onSubmit={handleCreateAccountSubmit}
            >
              <label htmlFor="username">Username</label>
              <input
                className="shadow-md shadow-slate-300 border border-slate-300 rounded-md px-4 py-2 my-2"
                id="username"
                type="text"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                className="shadow-md shadow-slate-300 border border-slate-300 rounded-md px-4 py-2 my-2"
                id="password"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="rounded-md text-white bg-primary hover:bg-dark-primary p-4 mt-4"
                type="submit"
              >
                Create Account
              </button>
              {errorMessage && (
                <p className="text-red-500 my-2">{errorMessage}</p>
              )}
              <div className="flex justify-center items-center space-x-1 mt-4">
                <button
                  className="text-secondary hover:text-dark-secondary font-bold"
                  type="button"
                  onClick={switchModalScreen}
                >
                  Already have an account?
                </button>
              </div>
            </form>
          </>
        )}
      </dialog>
    </div>
  );
}
