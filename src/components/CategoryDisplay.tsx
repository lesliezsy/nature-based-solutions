import { useQuery } from "@tanstack/react-query";
import { type Post } from "./PostList";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

interface Props {
  categoryId: number;
}

interface PostWithCategory extends Post {
  categories: {
    name: string;
  };
}

export const fetchCategoryPost = async (
  categoryId: number
): Promise<PostWithCategory[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(name)")
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as PostWithCategory[];
};

export const CategoryDisplay = ({ categoryId }: Props) => {
  const { data, error, isLoading } = useQuery<PostWithCategory[], Error>({
    queryKey: ["categoryPost", categoryId],
    queryFn: () => fetchCategoryPost(categoryId),
  });

  if (isLoading)
    return <div className="text-center py-4">Loading categories...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-4">
        Error: {error.message}
      </div>
    );
  return (
    <div>
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-cyan-800 bg-clip-text text-transparent">
        {data && data[0]?.categories.name} 
        
        Category Posts
      </h2>

      {data && data.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {data.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No posts in this category yet.
        </p>
      )}
    </div>
  );
};