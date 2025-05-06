"use client";
import {
  Button,
  PasswordInput,
  Select,
  Paper,
  Flex,
  Text,
  Box,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { SignupForm, SignupFormSchema } from "../lib/signupSchema";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "../lib/actions";
import { MdOutlinePsychology } from "react-icons/md";

export default function Login() {
  const form = useForm<SignupForm>({
    mode: "controlled",
    initialValues: {
      profile: "patient",
      password: "",
    },
    validate: zodResolver(SignupFormSchema),
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      my={"lg"}
      gap={"md"}
      w={{ xs: "100%", lg: "auto" }}
    >
      <MdOutlinePsychology size={80} width={80} height={80} />
      <Text size="xl">Diario Psicológico</Text>
      <Paper shadow="xs" withBorder p="xl" bg={"rgba(25, 113, 194, 0.06)"}>
        <Box component="form" action={formAction}>
          <Flex direction={"column"} gap={"sm"}>
            <Select
              label="Perfil"
              placeholder="Perfil"
              data={[
                { value: "patient", label: "Paciente" },
                { value: "psychologist", label: "Psicólogo" },
              ]}
              name="profile"
              {...form.getInputProps("profile")}
              visibleFrom="md"
              allowDeselect={false}
              required
            />
            <Select
              label="Perfil"
              placeholder="Perfil"
              data={[
                { value: "patient", label: "Paciente" },
                { value: "psychologist", label: "Psicólogo" },
              ]}
              name="profile"
              {...form.getInputProps("profile")}
              hiddenFrom="md"
              size="lg"
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Password"
              name="password"
              visibleFrom="md"
              {...form.getInputProps("password")}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              name="password"
              hiddenFrom="md"
              size="lg"
              {...form.getInputProps("password")}
              required
            />
            <input type="hidden" name="redirectTo" value={callbackUrl} />

            <Button
              aria-disabled={isPending}
              disabled={!form.isValid()}
              type="submit"
              mt={"md"}
              visibleFrom="md"
              loading={isPending}
            >
              Ingresar
            </Button>
            <Button
              aria-disabled={isPending}
              loading={isPending}
              disabled={!form.isValid()}
              type="submit"
              mt={"md"}
              hiddenFrom="md"
              size="lg"
            >
              Ingresar
            </Button>

            {errorMessage && (
              <Text w={"80%"} mx={"auto"} ta={"center"} c={"red.3"}>
                {errorMessage}
              </Text>
            )}
          </Flex>
        </Box>
      </Paper>
    </Flex>
  );
}
