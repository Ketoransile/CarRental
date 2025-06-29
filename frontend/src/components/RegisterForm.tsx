import { addToast, Button, Form, Input, toast } from "@heroui/react";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/registerSchema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const RegisterForm: React.FC = () => {
  const defaultValues: RegisterFormData = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });
  const navigate = useNavigate();
  const fetchSession = useAuthStore((state) => state.fetchSession);
  const onSubmit = async () => {
    try {
      console.log(watch());
      const values = watch();
      const { data, error } = await authClient.signUp.email(
        {
          email: values.email, // user email address
          password: values.password, // user password -> min 8 characters by default
          name: values.username, // user display name
          callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: async (ctx) => {
            //redirect to the dashboard or sign in page
            await fetchSession();
            addToast({
              title: "Successfully registered, redirecting...",
            });
            navigate("/");
          },
          onError: (ctx) => {
            // display the error message
            addToast({
              title: "Error while registering..",
              description: ctx.error.message,
            });
            // alert(ctx.error.message);
          },
        }
      );
      // reset();
    } catch (err) {
      addToast({
        title: "An unexpected error occurred",
      });
      console.log("UNKNOWN error ocurred ", err);
    }
  };
  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4 z-10"
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            isRequired
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="text"
            errorMessage={errors.username?.message}
            isInvalid={!!errors.username}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            isRequired
            {...field}
            label="password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
            isRequired
            {...field}
            label="confirmPassword"
            labelPlacement="outside"
            name="confirmPassword"
            placeholder="Re-enter your password here"
            type="password"
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword}
          />
        )}
      />

      <Button
        color="primary"
        type="submit"
        className="w-full disabled:bg-blue-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting " : "Register"}
      </Button>
    </Form>
  );
};
