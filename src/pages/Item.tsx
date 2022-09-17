import { Button, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../services/product.service";

function Item() {
  const { id } = useParams();
  const item = useQuery(["get-single-item"], () => getItemById({ id: id }));
  const data = item.data?.data;
  const navigate = useNavigate();
  return (
    <>
      <div className="item-wrapper">
        {item.isLoading && <Loader />}
        {data ? (
          <div className="item-details">
            <h1>{data.name}</h1>
            <img src={data.imageUrl} width="200" height="200" />
            <p>Price: ${data.price}</p>
            <p>Category: {data.category.name}</p>
            <Button color="blue" onClick={() => navigate("edit")}>
              Edit
            </Button>
          </div>
        ) : (
          "Doesnot exists"
        )}
        <Outlet />
      </div>
    </>
  );
}

export default Item;
