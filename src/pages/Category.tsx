import { Button, Loader, Table } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import ManageCategory from "../components/ManageCategory";

import CategoryTableRow from "../components/CategoryTableRow";
import { useCategory } from "../hooks/useCategory";

function Category() {
  const category = useCategory();

  return (
    <>
      <div className="category">
        <ManageCategory />
        {category.isLoading && <Loader />}
        {category.isSuccess && (
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
              {category.data?.data.map((category: any, index: number) => {
                return (
                  <CategoryTableRow
                    category={category}
                    index={index}
                    key={category.id}
                  />
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Category;
