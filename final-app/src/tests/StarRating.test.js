import { render } from "@testing-library/react";
import StarRating from "../components/StarRating";

test("rendering stars", () => {
  const { getAllByTestId } = render(<StarRating rating={2} size={"1x"} />);

  expect(getAllByTestId("test-star").length).toBe(3);
});

test("rendering stars of given difficulty", () => {
  const difficulty = 2;
  const { getAllByTestId } = render(
    <StarRating rating={difficulty} size={"1x"} />
  );

  expect(getAllByTestId("test-star").length).toBe(3);
  expect(getAllByTestId("test-filled-star").length).toBe(difficulty);
});

test("rendering stars of zero difficulty", () => {
  const difficulty = 0;
  const { getAllByTestId } = render(
    <StarRating rating={difficulty} size={"1x"} />
  );

  expect(getAllByTestId("test-star").length).toBe(3);
  expect(getAllByTestId("test-empty-star").length).toBe(3);
});
