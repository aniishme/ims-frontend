import { Button, Loader, Table } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import ItemTableRow from "../components/ItemTableRow";
import { useUsers } from "../hooks/useUsers";
import { deleteUsers } from "../services/auth.service";

function UsersList() {
  const users = useUsers();
  const usersData = users?.data?.data;
  const {
    mutateAsync: handleDeleteUser,
    isError,
    isLoading,
    error,
  } = useMutation(deleteUsers);

  const handleDelete = (id: string) => {
    handleDeleteUser(
      { id: id },
      {
        onSuccess: () => {
          users.refetch();
        },
      }
    );
  };

  console.log(usersData);
  return (
    <div className="userlist-wrapper">
      {isError &&
        error instanceof AxiosError &&
        (error.message == "Network Error"
          ? "Can't connect to the network"
          : error.response?.data?.message)}
      {isLoading && <Loader />}
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
                  <td>
                    <Button color="red" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
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
