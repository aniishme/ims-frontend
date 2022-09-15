import {
  Box,
  Button,
  FileButton,
  Group,
  Loader,
  NativeSelect,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useCategory } from "../hooks/useCategory";
import { createItem } from "../services/product.service";

function ManageItems() {
  const queryClient = useQueryClient();
  const categories = useCategory();

  const categoryValue = categories?.data?.data?.map((category: any) => {
    return { label: category.name, value: category.id };
  });

  const [file, setFile] = useState<File | null>(null);

  const [itemData, setItemData] = useState({
    name: "",
    price: 0,
    categoryId: "",
  });

  const resetForm = () => {
    setItemData({
      name: "",
      price: 0,
      categoryId: "",
    });
    setFile(null);
  };

  const {
    mutate: handleAddItem,
    isLoading,
    isError,
    error,
  } = useMutation(createItem);
  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const base64 = (await convertToBase64(file as File)) as string;
    const payload = {
      ...itemData,
      price: Number(itemData.price),
      image: base64,
    };

    handleAddItem(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-item"]);
        resetForm();
      },
    });
  };
  return (
    <div>
      <Box sx={{ maxWidth: "fit-content" }}>
        <Title order={3} mb={20} my={50}>
          Create a new Item
        </Title>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Group>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Some item name"
              name="name"
              value={itemData.name}
              onChange={handleOnchange}
            />
            <TextInput
              withAsterisk
              label="Price ($)"
              placeholder="Price"
              type="number"
              name="price"
              value={itemData.price}
              onChange={handleOnchange}
            />
          </Group>

          <NativeSelect
            data={categoryValue ? categoryValue : []}
            placeholder="Pick one"
            label="Select Categories"
            withAsterisk
            name="categoryId"
            value={itemData.categoryId}
            onChange={(e) =>
              setItemData({ ...itemData, [e.target.name]: e.target.value })
            }
          />

          <Group position="left" my={10}>
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
          </Group>
          {file && (
            <Text size="sm" align="left" mt="sm">
              Picked file: {file.name}
            </Text>
          )}
          {isError && (
            <Text color="red">
              {error instanceof AxiosError &&
                (error.message == "Network Error"
                  ? "Can't connect to the network"
                  : error.response?.data?.message)}
            </Text>
          )}

          <Group position="right" mt="md">
            {isLoading ? <Loader /> : <Button type="submit">Create</Button>}
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default ManageItems;
