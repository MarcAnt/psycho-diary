// "use client";
// import React, { useActionState } from "react";
// import {
//   Button,
//   Card,
//   Flex,
//   PasswordInput,
//   Select,
//   Text,
//   TextInput,
// } from "@mantine/core";
// import ChangeTheme from "./ChangeTheme";
// import { signup } from "../actions/auth";
// import { useForm } from "@mantine/form";
// import { zodResolver } from "mantine-form-zod-resolver";
// import { SignupForm, SignupFormSchema } from "../lib/definition";
// import { z } from "zod";

// const schema = z.object({
//   user: z.string().refine((val) => val.length <= 3, {
//     message: "String can't be more than 255 characters",
//   }),
//   password: z.string().refine((val) => val.length <= 3, {
//     message: "String can't be more than 255 characters",
//   }),
//   // .regex(/[a-z]/, { message: "Contain at least one letter." }),
// });

// export type TestForm = z.infer<typeof schema>;

// const Login = () => {
//   // const form = useForm<SignupForm>({
//   //   mode: "uncontrolled",
//   //   initialValues: {
//   //     user: "patient",
//   //     password: "",
//   //   },
//   //   validate: zodResolver(SignupFormSchema),
//   // });

//   const form = useForm<TestForm>({
//     mode: "uncontrolled",
//     validate: zodResolver(schema),
//     initialValues: {
//       user: "",
//       password: "",
//     },
//   });

//   const [state, action, pending] = useActionState(signup, undefined);

//   // const { getValues } = form;
//   // const { user, password } = getValues();

//   return (
//     <Flex
//       direction="column"
//       gap="lg"
//       m="auto"
//       w={"100vw"}
//       align="center"
//       justify="center"
//     >
//       <ChangeTheme />
//       <Text size="xl">Diario Psicológico</Text>
//       <Card m={"auto"} shadow="sm" padding="xl" radius="md" withBorder>
//         <Flex direction="column" gap="lg" m="auto">
//           <form onSubmit={form.onSubmit(() => {})}>
//             {/* <Select
//               label="Perfil"
//               placeholder="Perfil"
//               data={[
//                 { value: "patient", label: "Paciente" },
//                 { value: "psychologist", label: "Psicólogo" },
//               ]}
//               name="user"
//               key={form.key("user")}
//               {...form.getInputProps("user")}
//               error={form.errors.user}
//             /> */}
//             <TextInput
//               label="Perfil"
//               placeholder="Perfil"
//               // data={[
//               //   { value: "patient", label: "Paciente" },
//               //   { value: "psychologist", label: "Psicólogo" },
//               // ]}
//               name="user"
//               key={form.key("user")}
//               {...form.getInputProps("user")}
//               error={form.errors.user}
//             />
//             {form.errors.selectOption && <div>{form.errors.selectOption}</div>}
//             <TextInput
//               label="Contraseña"
//               placeholder="Contraseña"
//               name="password"
//               key={form.key("password")}
//               {...form.getInputProps("password")}
//               error={form.errors.password}
//             />
//             {form.errors.password && <div>{form.errors.password}</div>}
//             <Button variant="light" type={"submit"} disabled={!form.isValid()}>
//               Ingresar
//             </Button>
//           </form>
//         </Flex>
//       </Card>
//     </Flex>
//   );
// };

// export default Login;

// components/MyForm.tsx
"use client";

import {
  Button,
  PasswordInput,
  Select,
  Paper,
  Flex,
  Text,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import ChangeTheme from "./ChangeTheme";
import { SignupForm, SignupFormSchema } from "../lib/definition";
import { useActionState } from "react";
import { signup } from "../actions/auth";

// export const formSchema = z.object({
//   // user: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   user: z.enum(["psychologist", "patient"]),
//   password: z
//     .string()
//     .min(6, { message: "Debe contener al menos 6 caracteres" })
//     .trim(),
//   // age: z.number().min(18, { message: "You must be at least 18 years old." }),
// });

// export type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const form = useForm<SignupForm>({
    mode: "controlled",
    initialValues: {
      user: "patient",
      password: "",
    },
    validate: zodResolver(SignupFormSchema),
  });

  const handleSubmit = (values: SignupForm) => {
    console.log(values);
  };

  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <Flex direction={"column"} justify={"center"} align={"center"} gap={"md"}>
      <ChangeTheme />
      <Text size="xl">Diario Psicológico</Text>
      <Paper shadow="xs" withBorder p="xl">
        <form onSubmit={form.onSubmit(handleSubmit)} action={action}>
          <Flex direction={"column"} gap={"sm"}>
            <Select
              label="Perfil"
              placeholder="Perfil"
              data={[
                { value: "patient", label: "Paciente" },
                { value: "psychologist", label: "Psicólogo" },
              ]}
              {...form.getInputProps("user")}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />

            <Button disabled={!form.isValid()} type="submit" mt={"md"}>
              Ingresar
            </Button>
          </Flex>
        </form>
      </Paper>
    </Flex>
  );
}
