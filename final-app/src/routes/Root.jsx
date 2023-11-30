import { NavLink, Outlet } from "react-router-dom";
import NavigationLink from "../components/NavigationLink";

export default function Root() {
  return (
    <main className="bg-background relative min-h-[100vh]">
      <nav className="flex items-center justify-between px-10 py-6 bg-background bg-opacity-[80%] fixed top-0 left-0 w-full z-50">
        <NavLink className="flex justify-center items-center" to={"/"}>
          <img src="/assets/logo.svg" alt="ClimbRepo Logo" />
          <h1 className="uppercase font-semibold">
            Climb<span className="text-primary">Repo</span>
          </h1>
        </NavLink>
        <div className="flex justify-center items-center space-x-5">
          <NavigationLink to={"/"}>Home</NavigationLink>
          <NavigationLink to={"/saved"}>Saved</NavigationLink>
          <NavigationLink to={"/profile"}>Profile</NavigationLink>
        </div>
      </nav>

      <Outlet />

      <footer className="bg-dark-grey flex justify-center items-center w-full p-6 absolute bottom-0 left-0">
        <p className="text-white">Ryan Levy © 2023</p>
      </footer>
    </main>
  );
}
