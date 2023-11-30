import { useLoaderData } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faUser } from "@fortawesome/free-solid-svg-icons";
import { postComment } from "../api/comments";

export default function Details() {
  const [techniqueData] = useLoaderData();
  const [userComment, setUserComment] = useState("");
  const [allComments, setAllComments] = useState(techniqueData.comments);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentData = {
      techniqueId: techniqueData.id,
      body: userComment.trim(),
      userId: 0, // Placeholder
    };
    const newComment = await postComment(commentData);
    setAllComments((prev) => [...prev, newComment]);
    setUserComment("");
  };

  useEffect(() => {
    document.title = `ClimbRepo | ${techniqueData.title} - Details`;
  }, []);

  return (
    <main className="py-32 px-20 md:px-40">
      <section className="mb-10 pb-10 border-b border-b-primary">
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
        <h2 className="text-3xl mb-6">Related Videos</h2>
        <ul className="flex items-center space-x-4">
          {techniqueData.tutorial_links.map((tutorial, index) => (
            <li
              key={index}
              className="p-2 rounded-md border border-slate-300 hover:bg-slate-200 inline-flex items-center grow-0 space-x-2"
            >
              <FontAwesomeIcon icon={faPlay} />
              <a rel="noreferrer" target="_blank" href={tutorial}>
                Tutorial {++index}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-4">
        <h1 className="text-3xl mb-4">Comments</h1>
        {allComments.length ? (
          allComments.map((comment) => (
            <div className="flex items-center space-x-2 rounded-md border border-dashed border-slate-300 p-4 my-2">
              <FontAwesomeIcon icon={faUser} />
              <p>{comment.body}</p>
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic">
            No comments yet, be the first to contribute!
          </p>
        )}
      </section>
      <form onSubmit={handleCommentSubmit}>
        <label htmlFor="user-comment" className="text-xl">
          Add Comment
        </label>
        <textarea
          placeholder="Write comment here..."
          className="border-slate-400 border rounded-md px-2 py-1 w-full my-4"
          id="user-comment"
          rows={3}
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        ></textarea>
        <button className="rounded-md text-white bg-primary p-4" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
