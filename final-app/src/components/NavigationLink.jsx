import { NavLink } from "react-router-dom";

export default function NavigationLink(props) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "text-sm font-semibold underline" : "text-sm"
      }
      to={props.to}
    >
      {props.children}
    </NavLink>
  );
}
