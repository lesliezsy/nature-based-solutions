import { CategoryList } from "../components/CategoryList"

export const CategoriesPage = () => {
  return (
    <div className="pt-20">
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-cyan-800 bg-clip-text text-transparent">
        Categories
      </h2>
      <CategoryList />
    </div>
  );
};