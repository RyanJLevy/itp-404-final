import { fireEvent, render, waitFor } from "@testing-library/react";
import TechniqueCard from "../components/TechniqueCard";
import { MemoryRouter } from "react-router-dom";

const techniqueData = {
  id: 0,
  title: "Knee Bar",
  slug: "knee-bar",
  image: "knee-bar.png",
  difficulty: 3,
  type: ["Stability"],
  description:
    "A knee bar is a maneuver in which a climber cams their knee against a blocky, cracky, or roofy feature. This often allows the climber to hang freely without the use of one or both of their hands. This then allows them to rest in the middle of a route and regain some expended strength. Beyond recovery, a knee bar can also extend a climber's reach. Similar to a drop knee, a knee bar can work to rotate a climber's hips closer to the wall and thus extend their reach potential. Overall, this maneuver requires both leg and core strength as well as a keen awareness of the features of a given block.",
  tutorial_links: ["https://www.youtube.com/watch?v=XlHh2V-BFMo"],
};

test("rendering technique card displays correct title", async () => {
  const { findByTestId, getByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <TechniqueCard
        title={techniqueData.title}
        image={techniqueData.image}
        difficulty={techniqueData.difficulty}
        type={techniqueData.type}
        key={techniqueData.title}
        slug={techniqueData.slug}
      />
    </MemoryRouter>
  );
  expect(getByTestId("title").innerHTML).toContain(techniqueData.title);
});

test("rendering technique card displays correct image", async () => {
  const { findByTestId, getByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <TechniqueCard
        title={techniqueData.title}
        image={techniqueData.image}
        difficulty={techniqueData.difficulty}
        type={techniqueData.type}
        key={techniqueData.title}
        slug={techniqueData.slug}
      />
    </MemoryRouter>
  );
  expect(getByTestId("image").src).toContain(techniqueData.image);
});

test("hover on technique card displays correct technique type(s)", async () => {
  const { findByTestId, getByTestId } = render(
    <MemoryRouter>
      <TechniqueCard
        title={techniqueData.title}
        image={techniqueData.image}
        difficulty={techniqueData.difficulty}
        type={techniqueData.type}
        key={techniqueData.title}
        slug={techniqueData.slug}
      />
    </MemoryRouter>
  );
  fireEvent.mouseOver(getByTestId("test-technique-card"));

  await waitFor(() => getByTestId("test-type"));
  expect(getByTestId("test-type").innerHTML).toContain(
    techniqueData.type.join(", ")
  );
});

test("hover on technique card reveals correct difficulty", async () => {
  const { getByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <TechniqueCard
        title={techniqueData.title}
        image={techniqueData.image}
        difficulty={techniqueData.difficulty}
        type={techniqueData.type}
        key={techniqueData.title}
        slug={techniqueData.slug}
      />
    </MemoryRouter>
  );
  fireEvent.mouseOver(getByTestId("test-technique-card"));

  await waitFor(() =>
    expect(getAllByTestId("test-filled-star").length).toBe(
      techniqueData.difficulty
    )
  );
});
