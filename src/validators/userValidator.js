import * as z from "zod";

export const idValidate = z.object({
  id: z.uuid("ID should be a valid UUID"),
});

export const usernameValidate = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters")
    .regex(
      /^[a-z0-9_.]+$/,
      "The username should contain only lowercase letters, numbers, underscores, and periods",
    )
    .toLowerCase(),
});

export const passwordValidate = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password must be at most 72 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&-]/,
      "Password must contain at least one special character, except period and underscore",
    ),
});

export const userBaseValidate = z.object({
  id: idValidate.shape.id.optional(),
  username: usernameValidate.shape.username,
  email: z.email("This email is not valid"),
  name: z
    .string()
    .trim()
    .min(3, "Name must contain at least 3 characters")
    .max(100, "Name must contain at most 100 characters")
    .regex(
      /^[^0-9@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`]+$/,
      "Name cannot contain numbers or special characters",
    )
    .optional(),
  password: passwordValidate.shape.password,
});

export const createUserValidate = userBaseValidate.omit({ id: true });

export const passwordLoginValidate = z.object({
  password: z.string().max(72, "Password must be at most 72 characters"),
});

export const updateUserValidate = userBaseValidate.omit({ id: true }).partial();

export const loginUsernameValidate = userBaseValidate.pick({
  username: true,
  password: true,
});

export const loginEmailValidate = z.object({
  email: userBaseValidate.shape.email,
  password: passwordLoginValidate.shape.password,
});

export const verifyOtpValidate = z.object({
  code: z
    .string()
    .length(6, "2FA code must contain 6 digits")
    .regex(/^\d{6}$/, "2FA code must contain only numbers"),
  email: userBaseValidate.shape.email,
});
