import { Button, Loader } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { deleteItem } from "../services/product.service";

type PropType = {
  item: any;
  index: number;
};

function ItemTableRow({ item, index }: PropType) {
  const queryClient = useQueryClient();
  const {
    mutate: handleDeleteItem,
    isError,
    error,
    isLoading,
  } = useMutation(deleteItem);
  const handleDelete = () => {
    handleDeleteItem(
      { id: item.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["get-item"]);
        },
      }
    );
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Link to={item.id}>{item.name}</Link>
      </td>
      <td>${item.price}</td>
      <td>
        <img src={item.imageUrl} width="50" height="50" />
      </td>
      <td>{item.category.name}</td>
      <td>
        {isLoading ? (
          <Loader />
        ) : (
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </td>
      {isError &&
        error instanceof AxiosError &&
        (error.message == "Network Error"
          ? "Can't connect to the network"
          : error.response?.data?.message)}
    </tr>
  );
}

export default ItemTableRow;
