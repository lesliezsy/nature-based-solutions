import { useParams } from "react-router";
import { CategoryDisplay } from "../components/CategoryDisplay";

export const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="pt-20">
      <CategoryDisplay categoryId={Number(id)} />
    </div>
  );
};