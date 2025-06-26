import type { z } from "zod";
import type { CarRentalSchema } from "../schemas/carRentalSchema";

export type CarRentalFormType = z.infer<typeof CarRentalSchema>;
