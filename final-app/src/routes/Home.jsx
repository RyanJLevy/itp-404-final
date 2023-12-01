import {
  faArrowRotateBack,
  faBackward,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import TechniqueCard from "../components/TechniqueCard";

export default function Home() {
  const techniques = useLoaderData();
  const [searchResults, setSearchResults] = useState(techniques);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  useEffect(() => {
    document.title = "ClimbRepo | Home";
  }, []);

  const handleTechniqueFilter = () => {
    let filteredTechniques = techniques;
    if (difficultyFilter !== "") {
      console.log(difficultyFilter);
      filteredTechniques = filteredTechniques.filter(
        (technique) => technique.difficulty.toString() === difficultyFilter
      );
    }
    if (searchTerm !== "") {
      filteredTechniques = filteredTechniques.filter((technique) =>
        technique.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setSearchResults(filteredTechniques);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm === "" && difficultyFilter === "") {
      return;
    }
    handleTechniqueFilter();
    setSearchSubmitted(true);
  };

  const resetSearchResults = () => {
    setSearchTerm("");
    setDifficultyFilter("");
    setSearchSubmitted(false);
    setSearchResults(techniques);
  };

  return (
    <main>
      <img
        className="object-cover w-full max-h-[30vh]"
        src="/assets/background1.jpg"
        alt="Climber on the wall"
      />

      <form
        className="w-full flex flex-col md:flex-row md:items-center justify-between mb-4 px-20 md:px-40 py-10 border-b border-b-secondary"
        onSubmit={handleSearchSubmit}
      >
        <div className="flex justify-center items-center shadow-md shadow-slate-300 border border-slate-300 rounded-md lg:w-[35%]">
          <input
            className="px-4 py-2 rounded-tl-md rounded-bl-md w-full"
            placeholder="Technique name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          ></input>
          <button
            className="bg-secondary p-3 flex justify-center items-center text-white rounded-tr-md rounded-br-md"
            type="submit"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        {/* Filters */}
        <div className="flex md:items-center space-x-4 mt-4 md:mt-0">
          {searchSubmitted && (
            <>
              <div className="hidden md:flex justify-center items-center space-x-1">
                <FontAwesomeIcon
                  className="text-slate-600"
                  icon={faArrowRotateBack}
                />
                <button
                  className="text-slate-600 underline"
                  type={"button"}
                  onClick={resetSearchResults}
                >
                  View all techniques
                </button>
              </div>
              <button
                type="button"
                className="md:hidden"
                onClick={resetSearchResults}
                title="View all techniques"
              >
                <FontAwesomeIcon
                  className="text-slate-600"
                  icon={faArrowRotateBack}
                />
              </button>
            </>
          )}
          <select
            value={difficultyFilter}
            onChange={(event) => setDifficultyFilter(event.target.value)}
            className="shadow-md shadow-slate-300 border border-slate-300 rounded-md px-4 py-2"
          >
            <option value={""}>--- Select Difficulty ---</option>
            <option value={"0"}>0 - Beginner</option>
            <option value={"1"}>1 - Intermediate</option>
            <option value={"2"}>2 - Advanced</option>
            <option value={"3"}>3 - Expert</option>
          </select>
        </div>
      </form>

      <section className="flex flex-col items-center pb-32 px-20 md:px-40 py-5">
        <div className="flex items-center md:items-start flex-col md:flex-row w-full flex-wrap">
          {searchResults.map((technique) => (
            <TechniqueCard
              title={technique.title}
              image={technique.image}
              difficulty={technique.difficulty}
              type={technique.type}
              key={technique.title}
              slug={technique.slug}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
