import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function Profile() {
  const loaderData = useLoaderData();

  useEffect(() => {
    document.title = `ClimbRepo | Profile - ${loaderData?.username ?? "Guest"}`;
  }, []);

  return (
    <main className="py-32 px-20 md:px-40">
      <h1 className="text-5xl">User Profile</h1>
      {loaderData ? (
        <>
          <div className="flex items-center space-x-2 my-6">
            <FontAwesomeIcon
              className="text-secondary"
              icon={faCrown}
              size="2x"
            />
            <h1 className="text-3xl text-secondary">{loaderData.username}</h1>
          </div>
          <div className="rounded-md border border-slate-500 py-6">
            <h2 className="text-2xl mb-6 px-4">Comment History</h2>
            {loaderData.comments.length ? (
              loaderData.comments.map((comment) => (
                <div
                  className="p-4 border-b border-b-slate-300 flex items-center space-x-4"
                  key={comment.id}
                >
                  <p className="text-slate-500">{comment.date}</p>
                  <p>{comment.body}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic px-4">
                No comment history available.
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="text-slate-500 italic my-6">
          No account information to display. Login or create an account!
        </p>
      )}
    </main>
  );
}
