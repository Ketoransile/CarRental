import { addToast, Button, Form, Input } from "@heroui/react";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const defaultValues: LoginFormData = {
    email: "",
    password: "",
  };
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });
  const fetchSession = useAuthStore((state) => state.fetchSession);
  const onSubmit = async () => {
    try {
      console.log(watch());
      const values = watch();
      const { data, error } = await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: async (ctx) => {
            //redirect to the dashboard or sign in page
            await fetchSession();
            addToast({
              title: "Logged in successfully, redirecting...",
            });
            navigate("/");
          },
          onError: (ctx) => {
            // display the error message
            addToast({
              title: "Error while logging in..",
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

      {/* {isSubmitting ? "Logging You in..." : "Login"} */}

      {isSubmitting ? (
        <Button
          isLoading
          color="primary"
          className="w-full disabled:bg-blue-400"
        >
          Logging You in..
        </Button>
      ) : (
        <Button
          color="primary"
          type="submit"
          className="w-full disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          Login
        </Button>
      )}
    </Form>
  );
};
