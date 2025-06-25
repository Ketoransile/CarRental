import { z } from "zod";
import type { ActionResponse, ContactFormData } from "../types/contactFormType";
import { addToast, Toast } from "@heroui/toast";

const messageSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/.test(
          val
        ),
      {
        message: "Invalid phone number",
      }
    ),
  message: z.string().min(20, "Message must be at least 20 characters long"),
});

export async function submitMessage(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData: ContactFormData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phoneNumber: (formData.get("phoneNumber") as string) || undefined,
      message: formData.get("message") as string,
    };
    const validatedData = messageSchema.safeParse(rawData);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }
    console.log("Message submitted is ", validatedData.data);
    formData.append("access_key", "ae571f37-8e03-4b62-a37a-c558f552db2e");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    try {
      // Send the data to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();
      if (result.success) {
        // Show success toast

        addToast({
          title:
            "Thank you! Your message has been sent successfully. I'll get back to you as soon as possible.",
          color: "primary",
        });
        // Clear the form fields
      } else {
        // Show error toast
        addToast({
          title:
            "Oops! Something went wrong. Please try again later or reach out directly.",
          color: "danger",
        });
      }
    } catch (error) {
      // Show error toast
      console.log(error);
      addToast({
        title:
          "Oops! Something went wrong. Please try again later or reach out directly.",
        color: "danger",
      });
    }
    return {
      success: true,
      message: "Message Sent Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error ocurred",
    };
  }
}
