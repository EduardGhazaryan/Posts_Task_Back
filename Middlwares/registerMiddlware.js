import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email",
    "any.required": "Email is required",
  }),
  password: Joi.string()
  .min(8) 
  .regex(/[A-Z]/, "an uppercase letter") 
  .regex(/\d/, " a number") 
  .regex(/[!@#$%^&*(),.?":{}|<>]/, " a special character") 
  .required()
  .messages({
    'string.min': 'The password must be at least 8 characters long',
    'string.pattern.name': 'Passwor must conatin {#name}.',
    'any.required': 'Password is required',
  }),
  name : Joi.string()
  .min(5)
  .required()
  .messages({
    'string.min': 'The password must be at least 8 characters long',
    'any.required': 'Password is required',
  })
});


export const validateInput = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(err => ({
      field: err.context.key,
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  next();
};
