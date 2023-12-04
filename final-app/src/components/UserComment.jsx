import { faCrown, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserComment(props) {
  return (
    <div className="flex items-center justify-between rounded-md border border-dashed border-slate-300 p-4 my-2">
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon
          className="text-slate-500"
          icon={props.userId === props.loggedInUserId ? faCrown : faUser}
          data-testid={
            props.userId === props.loggedInUserId
              ? "test-current-user"
              : "test-other-user"
          }
        />
        <p className="text-slate-500">{props.username}</p>
        <p>{props.body}</p>
      </div>
      {props.userId === props.loggedInUserId && (
        <button
          type="button"
          className=" text-secondary hover:text-dark-secondary"
          onClick={props.handleCommentDelete}
          title="Delete comment"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
}
