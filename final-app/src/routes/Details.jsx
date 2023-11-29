import { useLoaderData } from "react-router-dom";
import StarRating from "../components/StarRating";

export default function Details() {
  const [techniqueData] = useLoaderData();
  console.log(techniqueData);
  return (
    <main className="py-32 px-20 md:px-40">
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-8">
          <h1 className="text-5xl">{techniqueData.title} </h1>
          <h2 className="text-dark-grey text-lg">
            /{techniqueData.type.join(", ")}/
          </h2>
          <StarRating rating={techniqueData.difficulty} size={"1x"} />
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <p className="mb-4 md:max-w-[50%]">{techniqueData.description}</p>
          <img
            className="md:max-w-[50%]"
            src={`/assets/techniques/${techniqueData.image}`}
            alt={techniqueData.title}
          ></img>
        </div>
        <h2 className="text-3xl">Related Videos</h2>
        <ul>
          {techniqueData.tutorial_links.map((tutorial, index) => (
            <li key={index}>
              <a rel="noreferrer" target="_blank" href={tutorial}>
                Tutorial {++index}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <form>
        <label htmlFor="user-comment">Add Comment</label>
        <textarea
          placeholder="Add comment here..."
          className="border-slate-400 border rounded-md px-2 py-1 w-full"
          id="user-comment"
          rows={3}
        ></textarea>
      </form>
    </main>
  );
}
