import axios from "axios";
import { io } from "socket.io-client";

export const listPosts = async () => {
  const { data } = await axios.get("/api/posts");
  return data;
};

export const getPostDetails = async (id: string) => {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
};

interface PostData {
  line: string;
  direction: string;
  closestStop: string;
  vehicleCode?: string;
  description?: string;
}

export const createPost = async ({
  line,
  direction,
  closestStop,
  vehicleCode,
  description,
}: PostData) => {
  const socket = io("/");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios.post(
    "/api/posts",
    { line, direction, closestStop, vehicleCode, description },
    config
  );

  socket.emit("post", line);
};

export const deletePost = async (id: string) => {
  await axios.delete(`/api/posts/${id}`);
};

export const likePost = async (id: string) => {
  await axios.put(`/api/posts/like/${id}`);
};
