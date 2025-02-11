import { z } from 'zod'

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters.' })
    .max(300, { message: 'Content must not be longer than 300 characters.' }),
  starRating: z
    .number()
    .min(1, { message: 'Rating must be at least 1 star.' })
    .max(5, { message: 'Rating must not be more than 5 stars.' }),
  categorySpecificRatings: z.object({
    healthcare: z.object({
      expenses: z.number().min(1).max(5),
      treatment: z.number().min(1).max(5),
      nurses: z.number().min(1).max(5),
      environment: z.number().min(1).max(5),
    }).optional(),
    finance: z.object({
      customerService: z.number().min(1).max(5),
      interestRates: z.number().min(1).max(5),
      fees: z.number().min(1).max(5),
      accessibility: z.number().min(1).max(5),
    }).optional(),
    education: z.object({
      teachingQuality: z.number().min(1).max(5),
      facilities: z.number().min(1).max(5),
      extracurricular: z.number().min(1).max(5),
      supportServices: z.number().min(1).max(5),
    }).optional(),
    lifestyle: z.object({
      amenities: z.number().min(1).max(5),
      location: z.number().min(1).max(5),
      community: z.number().min(1).max(5),
      valueForMoney: z.number().min(1).max(5),
    }).optional(),
  }).optional(),
});
