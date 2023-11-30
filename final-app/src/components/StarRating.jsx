import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StarRating(props) {
  const maxDifficultyRating = 3;
  const stars = [];
  for (let i = 1; i <= maxDifficultyRating; i++) {
    const isStarFilled = i <= props.rating;
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        color={isStarFilled ? "#f9c74f" : "#eee"}
        size={props.size}
      />
    );
  }
  return <div className="flex md:justify-center items-center">{stars}</div>;
}
