import * as z from "zod";

const createUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is not valid"
    }).email(),
    name: z.string(),
    password: z.string({
        required_error: "Password is required"
    })
});

export type CreateUserInput = z.infer<typeof createUserSchema>