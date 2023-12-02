import { z } from 'zod';

// set validation schema for fullname
const TUserNameValidationSchema = z.object({
    firstName: z.string()
        .min(1, { message: 'First name is required' })
        .max(20, { message: 'Max allowed length is 20' }),
    lastName: z.string()
        .min(1, { message: 'Last name is required' })
        .max(20, { message: 'Max allowed length is 20' }),
});

// set validation schema for address
const TUserAddressSchema = z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  });

  // set validation schema for orders
export const TUserOrdersSchema = z.object({
    productName: z.string().min(1),
    price: z.number(),
    quantity: z.number(),
  });

//set validation schema for user
const userValidationSchema = z.object({
    userId: z.number().min(1),
    username: z.string().max(20),
    password: z.string().max(20,{ message: 'Password max allowed length is 20' }),
    fullName: TUserNameValidationSchema,
    age:z.number(),
    email: z.string().email({ message: 'Invalid email format' }).min(10, { message: 'Email Min allowed length is 10' }),
    isActive: z.boolean().default(true),
    hobbies:z.array(z.string()),
    address:TUserAddressSchema,
    orders:z.array(TUserOrdersSchema).optional(),
});

export default userValidationSchema;
