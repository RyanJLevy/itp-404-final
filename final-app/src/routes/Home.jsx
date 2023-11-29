import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TechniqueCard from "../components/TechniqueCard";

export default function Home() {
  const techniques = useLoaderData();
  const [searchResults, setSearchResults] = useState(techniques);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTechniqueFilter = (partialSearchTerm) => {
    const filteredTechinques = techniques.filter((technique) =>
      technique.title.toLowerCase().includes(partialSearchTerm.toLowerCase())
    );
    setSearchResults(filteredTechinques);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    handleTechniqueFilter(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm.length) {
      setSearchResults(techniques);
      return;
    }
    handleTechniqueFilter(searchTerm);
    setSearchTerm("");
  };

  return (
    <main>
      <img
        className="object-cover w-full max-h-[30vh]"
        src="/assets/background1.jpg"
        alt="Climber on the wall"
      />

      <form
        className="w-full flex items-center justify-between mb-4 px-20 md:px-40 py-10 border-b border-b-primary"
        onSubmit={handleSearchSubmit}
      >
        <div className="flex justify-center items-center shadow-md shadow-slate-300 border border-slate-300 rounded-md lg:w-[35%]">
          <input
            className="px-4 py-2 rounded-tl-md rounded-bl-md w-full"
            placeholder="Technique name..."
            value={searchTerm}
            onChange={handleInputChange}
          ></input>
          <button
            className="bg-primary p-3 flex justify-center items-center text-white rounded-tr-md rounded-br-md"
            type="submit"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
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
