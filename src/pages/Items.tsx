import { Loader, Table } from "@mantine/core";
import React from "react";
import ItemTableRow from "../components/ItemTableRow";
import ManageItems from "../components/ManageItems";
import Navbar from "../components/Navbar";
import { useItem } from "../hooks/useItem";

function Items() {
  const item = useItem();
  return (
    <>
      <Navbar />
      <div className="items">
        <ManageItems />
        {item.isLoading && <Loader />}
        {item.isSuccess && (
          <Table verticalSpacing={"md"} striped highlightOnHover>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {item.data?.data.map((item: any, index: number) => {
                return <ItemTableRow item={item} index={index} key={item.id} />;
              })}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}

export default Items;
