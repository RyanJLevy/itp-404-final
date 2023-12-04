import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StarRating(props) {
  const maxDifficultyRating = 3;
  const stars = [];
  for (let i = 1; i <= maxDifficultyRating; i++) {
    const isStarFilled = i <= props.rating;
    stars.push(
      <div data-testid={"test-star"}>
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={isStarFilled ? "#f9c74f" : "#eee"}
          size={props.size}
          data-testid={isStarFilled ? "test-filled-star" : "test-empty-star"}
        />
      </div>
    );
  }
  return <div className="flex md:justify-center items-center">{stars}</div>;
}
