import React, { useEffect } from "react";

import { Pagination, Stack, Typography } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getComments } from "./commentSlice";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../components/LoadingScreen";
import { COMMENTS_PER_POST } from "../../app/config";

function CommentList({ postId }) {
  const dispatch = useDispatch();
  const {
    commentsById,
    commentsByPost,
    currentPage,
    totalComments,
    isLoading,
  } = useSelector(
    (state) => ({
      commentsByPost: state.comment.commentsByPost[postId],
      commentsById: state.comment.commentsById,
      currentPage: state.comment.currentPageByPost[postId] || 1,
      totalComments: state.comment.totalCommentsByPost[postId],
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (postId) dispatch(getComments({ postId }));
  }, [postId, dispatch]);

  const totalPages = Math.ceil(totalComments / COMMENTS_PER_POST);

  let renderComments;
  //get comments via matching commentId in commentsByPost object and commentById object
  if (commentsByPost) {
    const comments = commentsByPost.map((commentId) => commentsById[commentId]);
    renderComments = (
      <Stack spacing={1.5}>
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderComments = <LoadingScreen />;
  }

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalComments > 1
            ? `${totalComments} comments`
            : totalComments === 1
            ? `${totalComments} comment`
            : "No comment"}
        </Typography>
        {totalComments > COMMENTS_PER_POST && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => dispatch(getComments({ postId, page }))}
          />
        )}
      </Stack>
      {renderComments}
    </Stack>
  );
}

export default CommentList;
