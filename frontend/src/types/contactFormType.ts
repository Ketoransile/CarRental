export interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber?: string;
  message: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof ContactFormData]?: string[];
  };
  inputs?: ContactFormData;
}
