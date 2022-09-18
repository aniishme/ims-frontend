import { Button, Loader } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { FormEventHandler } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import { getItemById, updateItem } from "../services/product.service";

function EditItem() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const item = useQuery(["get-single-item"], () => getItemById({ id: id }));
  const data = item.data?.data;

  const categories = useCategory();

  const categoryValue = categories?.data?.data?.map((category: any) => {
    return { label: category.name, value: category.id };
  });
  const {
    mutateAsync: handleUpdateItem,
    isError,
    error,
    isLoading,
  } = useMutation(["update-item"], updateItem);
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: e.currentTarget.item.value,
      price: Number(e.currentTarget.price.value),
      categoryId: e.currentTarget.category.value,
    };

    handleUpdateItem(
      { payload: payload, id: data.id },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["get-single-item"]);
        },
      }
    );
  };

  return (
    <form className="edit-item" onSubmit={(e) => handleUpdate(e)}>
      <label>Name</label>
      <input type="text" defaultValue={data?.name} name="item" />
      <label>Price</label>
      <input type="number" defaultValue={data?.price} name="price" />
      <label>Select Category</label>
      <select name="category" id="category">
        {categoryValue?.map((category: any) => {
          return (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          );
        })}
      </select>
      {isLoading ? (
        <Loader />
      ) : (
        <Button color="green" type="submit">
          Update
        </Button>
      )}
      <Button
        mt={10}
        color="red"
        onClick={() => navigate(`/products/${data?.id}`)}
      >
        Cancel
      </Button>
      {isError &&
        error instanceof AxiosError &&
        (error.message == "Network Error"
          ? "Can't connect to the network"
          : error.response?.data?.message)}
    </form>
  );
}

export default EditItem;
