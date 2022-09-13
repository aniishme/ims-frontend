import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { getCategoryById } from "../services/category.service";
import { useParams } from "react-router-dom";

function CategoryView() {
  const { id } = useParams();
  const category = useQuery(["get-single-category"], () =>
    getCategoryById({ id: id })
  );
  const data = category.data?.data;
  return (
    <>
      <Navbar />
      <div className="category-wrapper">
        <h1>Name: {data?.name}</h1>
        {data?.items.length === 0
          ? "No Items in this category"
          : data?.items.map((item: any) => {
              return (
                <ul key={item.id}>
                  <li>{item.name}</li>
                  <p>Price ${item.price}</p>
                </ul>
              );
            })}
      </div>
    </>
  );
}

export default CategoryView;
