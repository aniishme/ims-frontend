import React from "react";

type PropType = {
  item: any;
  index: number;
};

function ItemTableRow({ item, index }: PropType) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>
        <img src={item.imageUrl} />
      </td>
      <td>{item.category.name}</td>
    </tr>
  );
}

export default ItemTableRow;
