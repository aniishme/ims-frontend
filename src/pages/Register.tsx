import {
  Box,
  Button,
  Group,
  Loader,
  NativeSelect,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Navbar from "../components/Navbar";
import { createUser, RegisterData } from "../services/auth.service";

function Register() {
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      name: "",
      username: "",
      password: "",
      role: "",
    },
    validate: {
      username: (value) => {
        if (!value) return "Username is required";
      },
      password: (value) => {
        if (!value) return "Password is required";
      },
    },
  });

  const {
    mutateAsync: register,
    isLoading,
    isError,
    error,
    isSuccess,
    data,
  } = useMutation(createUser);

  const handleSubmit = async (data: RegisterData) => {
    register(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries(["get-users"]);
      },
    });
  };

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Title order={3} mb={20} my={50}>
          Create a new User
        </Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="John Doe"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Username"
            placeholder="username"
            {...form.getInputProps("username")}
          />

          <PasswordInput
            withAsterisk
            mt="md"
            label="Password"
            placeholder="********"
            {...form.getInputProps("password")}
          />

          <NativeSelect
            data={["ADMIN", "MANAGER"]}
            placeholder="Pick one"
            label="Select Role"
            withAsterisk
            {...form.getInputProps("role")}
          />
          {isError && (
            <Text color="red">
              {error instanceof AxiosError &&
                (error.message == "Network Error"
                  ? "Can't connect to the network"
                  : error.response?.data?.message)}
            </Text>
          )}
          {isSuccess && <Text color="blue">User Created Successfully</Text>}
          <Group position="right" mt="md">
            {isLoading ? <Loader /> : <Button type="submit">Create</Button>}
          </Group>
        </form>
      </Box>
    </>
  );
}

export default Register;
