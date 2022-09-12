import { Button, Loader, Table } from "@mantine/core";
import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import ManageCategory from "../components/ManageCategory";

import {
  CategoryContext,
  CategoryContextType,
} from "../context/CategoryContext";
import CategoryTableRow from "../components/CategoryTableRow";

function Category() {
  const { isLoading, isSuccess, data } = useContext(
    CategoryContext
  ) as CategoryContextType;

  return (
    <>
      <Navbar />
      <div className="category">
        <ManageCategory />
        {isLoading && <Loader />}
        {isSuccess && (
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
