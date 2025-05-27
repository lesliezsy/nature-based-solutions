import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router";

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
}
export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Category[];
};

export const CategoryList = () => {
  const { data, error, isLoading } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
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
    <div className="max-w-5xl mx-auto space-y-4">
      {data?.map((category) => (
        <div
          key={category.id}
          className="border border-white/10 p-4 rounded hover:-translate-y-1 transition transform"
        >
          <Link
            to={`/category/${category.id}`}
            className="text-2xl font-bold text-green-600 hover:underline"
          >
            {category.name}
          </Link>
          <p className="text-gray-400 mt-2">{category.description}</p>
        </div>
      ))}
    </div>
  );
};