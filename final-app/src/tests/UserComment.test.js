import { render } from "@testing-library/react";
import UserComment from "../components/UserComment";

const commentData = {
  body: "Test comment",
  userId: 1,
  username: "testuser",
};

test("rendering user comment", () => {
  const userId = 1;
  const { getByText } = render(
    <UserComment
      loggedInUserId={userId}
      userId={commentData.userId}
      username={commentData.username}
      body={commentData.body}
      handleCommentDelete={() => {}}
    />
  );
  expect(getByText(commentData.username)).toBeTruthy;
  expect(getByText(commentData.body)).toBeTruthy;
});

test("rendering logged in user comment displays correct icon", () => {
  const userId = 1;
  const { getByTestId } = render(
    <UserComment
      loggedInUserId={userId}
      userId={commentData.userId}
      username={commentData.username}
      body={commentData.body}
      handleCommentDelete={() => {}}
    />
  );
  expect(getByTestId("test-current-user")).toBeTruthy();
});

test("rendering another user comment displays correct icon", () => {
  const userId = 3;
  const { getByTestId } = render(
    <UserComment
      loggedInUserId={userId}
      userId={commentData.userId}
      username={commentData.username}
      body={commentData.body}
      handleCommentDelete={() => {}}
    />
  );
  expect(getByTestId("test-other-user")).toBeTruthy();
});
