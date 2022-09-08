import { Button, Loader, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
  CategoryContext,
  CategoryContextType,
} from "../context/CategoryContext";

function Category() {
  const { isLoading, isSuccess, data } = useContext(
    CategoryContext
  ) as CategoryContextType;
  return (
    <>
      <Navbar />
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="category">
          <Table verticalSpacing={"md"} striped highlightOnHover>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>No. of Items</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((category: any, index: number) => {
                return (
                  <tr key={category.id} className="category-list-item">
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/category/${category.id}`}>
                        {category.name}
                      </Link>
                    </td>
                    <td>{category.items.length}</td>
                    <td>
                      <Button color="blue">Edit</Button>
                      <Button color="red">Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Category;
