import { z } from 'zod';
import { IVehicle } from './IVehicle';

export const carZodSchema = z.object({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).positive().gte(2).lte(4),

  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).positive().gte(2).lte(7),
});

type Car = z.infer<typeof carZodSchema>;

export interface ICar extends IVehicle {
  [x: string]: unknown;
  doorsQty: Car['doorsQty'],
  seatsQty: Car['seatsQty'],
}
