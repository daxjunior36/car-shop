import { z } from 'zod';
import { IVehicle, vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().int().min(2).max(4),
  seatsQty: z.number().int().min(2).max(7),
});

type Car = z.infer<typeof carZodSchema>;

export interface ICar extends IVehicle {
  doorsQty: Car['doorsQty'],
  seatsQty: Car['seatsQty'],
}