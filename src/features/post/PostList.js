import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./postSlice";
import PostCard from "./PostCard";

function PostList({ userId }) {
  const dispatch = useDispatch();
  const { totalPosts, postsById, currentPagePosts, isLoading } = useSelector(
    (state) => state.post
  );
  const posts = currentPagePosts.map((postId) => postsById[postId]); //Note this logic: taking values from an objec
  let [page, setPage] = useState(1);

  useEffect(() => {
    if (userId) {
      dispatch(getPosts({ userId, page }));
    }
  }, [userId, page, dispatch]);

  return (
    <div>
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {posts ? (
        <LoadingButton
          loading={isLoading}
          disabled={Boolean(totalPosts) && posts.length >= totalPosts}
          onClick={() => setPage((page) => page + 1)} //page++ returns old number

          //must pass in page as prevState to incre,
        >
          Load More
        </LoadingButton>
      ) : (
        <Typography> No posts</Typography>
      )}
    </div>
  );
}

export default PostList;
