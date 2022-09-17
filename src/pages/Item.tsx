import { Button, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../services/product.service";

function Item() {
  const { id } = useParams();
  const category = useQuery(["get-single-item"], () => getItemById({ id: id }));
  const data = category.data?.data;
  return (
    <>
      <div className="item-wrapper">
        {category.isLoading && <Loader />}
        {data ? (
          <>
            <h1>{data.name}</h1>
            <img src={data.imageUrl} width="200" height="200" />
            <p>Price: ${data.price}</p>
            <p>Category: {data.category.name}</p>
            <Button color="blue">Edit</Button>
          </>
        ) : (
          "Doesnot exists"
        )}
      </div>
    </>
  );
}

export default Item;
