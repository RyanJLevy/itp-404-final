import { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function TechniqueCard(props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      className="bg-background shadow-md shadow-slate-300 border border-slate-100 rounded-md w-full md:w-[40%] lg:w-[22%] m-[1.5%] md:m-[1.5%] cursor-pointer relative"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      to={`/details/${props.slug}`}
    >
      {/* Overlay displayed on hover with additional info */}
      <div
        className={`absolute z-[49] top-0 left-0 ${
          isHover ? "bg-opacity-70" : "bg-opacity-0"
        } bg-dark-grey w-full min-h-full duration-500 ease-in-out rounded-md flex flex-col justify-center items-center`}
      >
        {isHover && (
          <div className="flex flex-col justify-center min-h-full w-full px-6">
            <div className="flex items-center space-x-2">
              <p className="text-white">
                <span className="text-slate-300">Difficulty:</span>
              </p>
              <StarRating rating={props.difficulty} size={"1x"} />
            </div>

            <p className="text-white">
              <span className="text-slate-300">Move type:</span>{" "}
              {props.type.join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Technique title */}
      <div className="w-full absolute top-0 left-0 z-50 p-4 bg-white bg-opacity-80 rounded-tr-sm rounded-tl-sm">
        <h1 className="text-lg md:text-3xl">{props.title}</h1>
      </div>
      <div className="object-contain overflow-hidden rounded-md">
        <img
          className={`${isHover && "scale-110"} duration-500 ease-in-out`}
          src={`/assets/techniques/${props.image}`}
          alt={props.title}
        />
      </div>
    </Link>
  );
}
