import { useLoaderData } from "react-router-dom";
import TechniqueCard from "../components/TechniqueCard";
import { useEffect } from "react";

export default function Saved() {
  const loaderData = useLoaderData();

  useEffect(() => {
    document.title = "ClimbRepo | Saved Techniques";
  }, []);

  return (
    <main className="py-32 px-20 md:px-40">
      <h1 className="text-5xl">Saved Techniques</h1>
      <section className="flex flex-col items-center py-5">
        {loaderData ? (
          <div className="flex items-center md:items-start flex-col md:flex-row w-full flex-wrap">
            {loaderData.map((technique) => (
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
        ) : (
          <p className="text-slate-500 italic my-6">
            You must log in to see your saved techniques!
          </p>
        )}
      </section>
    </main>
  );
}
