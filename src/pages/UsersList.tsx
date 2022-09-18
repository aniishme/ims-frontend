import { Loader, Table } from "@mantine/core";
import React from "react";
import ItemTableRow from "../components/ItemTableRow";
import { useUsers } from "../hooks/useUsers";

function UsersList() {
  const users = useUsers();
  const usersData = users?.data?.data;
  console.log(usersData);
  return (
    <div className="userlist-wrapper">
      {users?.isLoading && <Loader />}
      {users?.isSuccess && (
        <Table verticalSpacing={"md"} striped highlightOnHover>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.map((user: any, index: number) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UsersList;
