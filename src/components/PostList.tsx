import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  avatar_url?: string;
  like_count?: number;
  comment_count?: number;
}

// return type is a Promise containing a list of Post objects
const fetchPosts = async (): Promise<Post[]> => {
  // Use a Supabase RPC function to fetch posts with counts
  // This assumes you have created a function in Supabase called `get_posts_with_counts`
  // that returns posts with their like and comment counts
  const { data, error } = await supabase.rpc("get_posts_with_counts");

  // const { data, error } = await supabase
  //   .from("posts")
  //   .select("*")
  //   .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // Ensure data is an array of Post objects
  return data as Post[];
};

export const PostList = () => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <div> Loading posts...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  // console.log(data);

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {data?.map((post, key) => (
        <PostItem post={post} key={key} />
      ))}
    </div>
  );
};