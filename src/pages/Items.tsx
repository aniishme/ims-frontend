import { Button, Loader, Table } from "@mantine/core";
import React, { useState } from "react";
import ItemTableRow from "../components/ItemTableRow";
import ManageItems from "../components/ManageItems";
import Navbar from "../components/Navbar";
import { useItem } from "../hooks/useItem";

function Items() {
  const item = useItem();
  const [create, setCreate] = useState(false);

  const handleManageItems = () => {
    setCreate(!create);
  };
  return (
    <>
      <div className="items">
        <Button onClick={handleManageItems} color="blue">
          {create ? "Cancel" : "Create"}
        </Button>
        {create && <ManageItems />}

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
                <th>Action</th>
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
