import { Button, Loader } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteCategory, editCategory } from "../services/category.service";

type PropType = {
  category: any;
  index: number;
};

function CategoryTableRow({ category, index }: PropType) {
  const queryClient = useQueryClient();
  const [editState, setEditState] = useState(false);
  const [editValue, setEditValue] = useState(category.name);

  const {
    mutateAsync: handleEditCategory,
    isError,
    error,
    isLoading,
  } = useMutation(editCategory);

  const handleDeleteCategory = useMutation(deleteCategory);

  const handleSumbit = () => {
    console.log(editValue);
    handleEditCategory(
      { name: editValue, id: category.id },
      {
        onSuccess: () => {
          setEditState(false);
          queryClient.invalidateQueries(["get-category"]);
        },
      }
    );
  };

  const handleDelete = () => {
    handleDeleteCategory.mutateAsync(
      { id: category.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["get-category"]);
        },
      }
    );
  };
  return (
    <tr key={category.id} className="category-list-item">
      <td>{index + 1}</td>
      <td>
        {editState ? (
          <div>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              width="100%"
            />
            {category.name !== editValue &&
              (isLoading ? (
                <Loader />
              ) : (
                <Button color="Orange" ml={5} onClick={handleSumbit}>
                  Save
                </Button>
              ))}
          </div>
        ) : (
          <Link to={`/categories/${category.id}`}>{category.name}</Link>
        )}
      </td>
      <td>{category.items.length}</td>
      <td>
        <Button
          color="blue"
          onClick={() => {
            setEditState(!editState);
            setEditValue(category.name);
          }}
        >
          {editState ? "Exit" : "Edit"}
        </Button>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      </td>
      {isError &&
        error instanceof AxiosError &&
        (error.message == "Network Error"
          ? "Can't connect to the network"
          : error.response?.data?.message)}
    </tr>
  );
}

export default CategoryTableRow;
