import { useLoaderData } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCrown,
  faPlay,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { deleteComment, postComment } from "../api/comments";
import { ToastContainer, toast } from "react-toastify";
import { useSessionStorage } from "@uidotdev/usehooks";
import { fetchSavedByUserId, updateUserSaved } from "../api/saved";

export default function Details() {
  const [techniqueData] = useLoaderData();
  const [userComment, setUserComment] = useState("");
  const [allComments, setAllComments] = useState(techniqueData.comments);
  const [userId, _] = useSessionStorage("userId", -1);
  const [techniqueSaved, setTechniqueSaved] = useState(false);
  const [userSavedTechniques, setUserSavedTechniques] = useState([]); // Currently logged in user's saved techniques

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!userComment.trim().length) {
      return;
    }
    const commentData = {
      techniqueId: techniqueData.id,
      body: userComment.trim(),
      userId: userId,
    };
    const newComment = await postComment(commentData);
    setAllComments((prev) => [...prev, newComment]);
    setUserComment("");
    toast.success("Comment successfully posted.", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const handleCommentDelete = async (commentData) => {
    await deleteComment(commentData);
    setAllComments((prev) =>
      prev.filter((comment) => comment.id !== commentData.id)
    );
    toast.success("Comment successfully deleted.", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const handleSaveTechniqueToggle = async () => {
    if (userId === -1) {
      toast.warn("You must be signed in to save a technique!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    let savedData = userSavedTechniques;
    let toastMessage = "";
    if (techniqueSaved) {
      savedData = savedData.filter((id) => id !== techniqueData.id);
      toastMessage = "Technique successfully unsaved.";
    } else {
      savedData.push(techniqueData.id);
      toastMessage = "Technique successfully saved.";
    }
    const response = await updateUserSaved(userId, savedData);
    toast.success(toastMessage, {
      position: toast.POSITION.TOP_RIGHT,
    });
    setUserSavedTechniques(response);
    setTechniqueSaved((prev) => !prev);
  };

  useEffect(() => {
    document.title = `ClimbRepo | ${techniqueData.title} - Details`;

    const checkSavedTechnique = async () => {
      const saved = await fetchSavedByUserId(userId);
      setUserSavedTechniques(saved);
      setTechniqueSaved(saved.includes(techniqueData.id));
    };

    if (userId !== -1) {
      checkSavedTechnique();
    }
  }, []);

  return (
    <main className="py-32 px-10 md:px-40">
      <section className="mb-10 pb-10 border-b border-b-primary">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <h1 className="text-5xl">{techniqueData.title} </h1>
            <h2 className="text-dark-grey text-lg">
              /{techniqueData.type.join(", ")}/
            </h2>
            <StarRating rating={techniqueData.difficulty} size={"1x"} />
          </div>
          <button
            type="button"
            className="p-2 border border-slate-300 rounded-md"
            onClick={handleSaveTechniqueToggle}
          >
            <FontAwesomeIcon
              className={techniqueSaved ? "text-secondary" : "text-slate-300"}
              icon={faBookmark}
              title={techniqueSaved ? "Unsave technique" : "Save technique"}
            />
          </button>
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
            <div
              key={comment.id}
              className="flex items-center justify-between rounded-md border border-dashed border-slate-300 p-4 my-2"
            >
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={comment.userId === userId ? faCrown : faUser}
                />
                <p>{comment.body}</p>
              </div>
              {comment.userId === userId && (
                <button
                  type="button"
                  className=" text-secondary hover:text-dark-secondary"
                  onClick={() => handleCommentDelete(comment)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic">
            No comments yet, be the first to contribute!
          </p>
        )}
      </section>
      {userId !== -1 ? (
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
          <button
            className="rounded-md text-white bg-primary hover:bg-dark-primary p-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <p className="text-slate-500 italic">
          You must be logged in in order to comment.
        </p>
      )}

      <ToastContainer />
    </main>
  );
}
