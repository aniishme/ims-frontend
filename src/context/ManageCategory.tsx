import { Button, Loader, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { addCategory } from "../services/category.service";

function ManageCategory() {
  const queryClient = useQueryClient();
  const [category, setCategory] = React.useState("");

  const {
    mutateAsync: handleAddCategory,
    data,
    isError,
    error,
    isLoading,
  } = useMutation(addCategory);

  const handleSumbit = () => {
    handleAddCategory(
      { name: category },
      {
        onSuccess: () => {
          setCategory("");
          queryClient.invalidateQueries(["get-category"]);
        },
      }
    );
  };

  return (
    <div
      className="manage-category"
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "50px",
        width: "300px",
        alignItems: "flex-end",
      }}
    >
      <TextInput
        style={{ width: "300px" }}
        placeholder="Category Name"
        label="Create a new category"
        value={category}
        error={
          isError &&
          error instanceof AxiosError &&
          (error.message == "Network Error"
            ? "Can't connect to the network"
            : error.response?.data?.message)
        }
        onChange={(e) => setCategory(e.target.value)}
        withAsterisk
      />

      {isLoading ? (
        <Loader />
      ) : (
        <Button mt={10} color="blue" onClick={handleSumbit}>
          Add
        </Button>
      )}
    </div>
  );
}

export default ManageCategory;
