import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  productname: z.string(),
  productcategories: z.string(),
  productdetails: z.string(),

  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  // categorySpecificRatings: z.object({
  //   healthcare: z.object({
  //     expenses: z.number().min(1).max(5),
  //     treatment: z.number().min(1).max(5),
  //     nurses: z.number().min(1).max(5),
  //     environment: z.number().min(1).max(5),
  //   }).optional(),
  //   finance: z.object({
  //     // Define fields for finance category
  //   }).optional(),
  //   education: z.object({
  //     // Define fields for education category
  //   }).optional(),
  //   lifestyle: z.object({
  //     // Define fields for lifestyle category
  //   }).optional(),
  // }).optional(),
});
