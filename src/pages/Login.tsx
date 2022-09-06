import React from "react";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";

import { Navigate } from "react-router-dom";
import { AxiosError } from "axios";

import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Title,
  Loader,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { loginHandler } from "../services/auth.service";

type FormData = {
  username: string;
  password: string;
};

function Login() {
  const cookie = new Cookies();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
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
    mutateAsync: login,
    isLoading,
    isError,
    error,
  } = useMutation(loginHandler);

  const handleSubmit = async (data: FormData) => {
    login(data, {
      onSuccess: () => cookie.set("auth", true, { path: "/" }),
    });
  };

  if (cookie.get("auth")) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Title order={3} mb={20} my={50}>
        Log In
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Username"
          placeholder="your@email.com"
          {...form.getInputProps("username")}
        />

        <PasswordInput
          withAsterisk
          mt="md"
          label="Password"
          placeholder="********"
          {...form.getInputProps("password")}
        />
        {isError && (
          <Text color="red">
            {error instanceof AxiosError &&
              (error.message == "Network Error"
                ? "Can't connect to the network"
                : error.response?.data?.message)}
          </Text>
        )}
        <Group position="right" mt="md">
          {isLoading ? <Loader /> : <Button type="submit">Log In</Button>}
        </Group>
      </form>
    </Box>
  );
}

export default Login;
