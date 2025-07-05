// import { addToast, Button, Form, Input } from "@heroui/react";
// import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { authClient } from "../lib/auth-client";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../stores/authStore";

// export const LoginForm: React.FC = () => {
//   const navigate = useNavigate();
//   const defaultValues: LoginFormData = {
//     email: "",
//     password: "",
//   };

//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//     watch,
//     reset,
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//     defaultValues,
//   });

//   const fetchSession = useAuthStore((state) => state.fetchSession);

//   const onSubmit = async () => {
//     try {
//       const values = watch();
//       const { data, error } = await authClient.signIn.email(
//         {
//           email: values.email,
//           password: values.password,
//         },
//         {
//           onRequest: (ctx) => {
//             // show loading
//           },
//           onSuccess: async (ctx) => {
//             await fetchSession();
//             addToast({
//               title: "Logged in successfully, redirecting...",
//             });
//             navigate("/");
//           },
//           onError: (ctx) => {
//             addToast({
//               title: "Error while logging in..",
//               description: ctx.error.message,
//             });
//           },
//         }
//       );
//     } catch (err) {
//       addToast({
//         title: "An unexpected error occurred",
//       });
//       console.log("UNKNOWN error ocurred ", err);
//     }
//   };

//   return (
//     <Form
//       className="w-full max-w-xs sm:max-w-sm flex flex-col gap-3 sm:gap-4 z-10"
//       onSubmit={handleSubmit(onSubmit)}
//       onReset={() => reset()}
//     >
//       <Controller
//         name="email"
//         control={control}
//         render={({ field }) => (
//           <Input
//             {...field}
//             isRequired
//             label="Email"
//             labelPlacement="outside"
//             name="email"
//             placeholder="Enter your email"
//             type="email"
//             errorMessage={errors.email?.message}
//             isInvalid={!!errors.email}
//             size="sm" // or "md" based on your preference
//           />
//         )}
//       />

//       <Controller
//         name="password"
//         control={control}
//         render={({ field }) => (
//           <Input
//             isRequired
//             {...field}
//             label="Password"
//             labelPlacement="outside"
//             name="password"
//             placeholder="Enter your password"
//             type="password"
//             errorMessage={errors.password?.message}
//             isInvalid={!!errors.password}
//             size="sm" // or "md" based on your preference
//           />
//         )}
//       />

//       {isSubmitting ? (
//         <Button
//           isLoading
//           color="primary"
//           className="w-full disabled:bg-blue-400 mt-2"
//           size="md"
//         >
//           Logging You in..
//         </Button>
//       ) : (
//         <Button
//           color="primary"
//           type="submit"
//           className="w-full disabled:bg-blue-300 mt-2"
//           disabled={isSubmitting}
//           size="md"
//         >
//           Login
//         </Button>
//       )}
//     </Form>
//   );
// };

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
      const values = watch();
      const { data, error } = await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onRequest: (ctx) => {
            // show loading
          },
          onSuccess: async (ctx) => {
            await fetchSession();
            addToast({
              title: "Logged in successfully, redirecting...",
            });
            navigate("/");
          },
          onError: (ctx) => {
            addToast({
              title: "Error while logging in..",
              description: ctx.error.message,
            });
          },
        }
      );
    } catch (err) {
      addToast({
        title: "An unexpected error occurred",
      });
      console.log("UNKNOWN error ocurred ", err);
    }
  };

  return (
    <Form
      className="w-full max-w-xs sm:max-w-sm flex flex-col gap-3 sm:gap-4 z-10"
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
            size="sm" // or "md" based on your preference
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
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            size="sm" // or "md" based on your preference
          />
        )}
      />

      {isSubmitting ? (
        <Button
          isLoading
          color="primary"
          className="w-full disabled:bg-blue-400 mt-2"
          size="md"
        >
          Logging You in..
        </Button>
      ) : (
        <Button
          color="primary"
          type="submit"
          className="w-full disabled:bg-blue-300 mt-2"
          disabled={isSubmitting}
          size="md"
        >
          Login
        </Button>
      )}
    </Form>
  );
};
