import { CreatePost } from "../components/CreatePost";

export const CreatePostPage = () => {
  return (
    <div className="pt-20">
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-cyan-800 bg-clip-text text-transparent">
        Publish News
      </h2>
      <CreatePost />
    </div>
  );
};