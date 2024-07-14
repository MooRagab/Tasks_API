import joi from "joi";

const dataMethod = ["body", "query", "headers", "params"];

export const validation = (schema) => {
  return (req, res, next) => {
    try {
      const validationArr = [];
      dataMethod.forEach((key, i) => {
        if (schema[key]) {
          const validationResult = schema[key].validate(req[key], {
            abortEarly: false,
          });
          if (validationResult?.error?.details) {
            validationArr.push(validationResult.error.details);
          }
        }
      });
      if (validationArr.length) {
        res
          .status(400)
          .json({ message: "Validation Error", err: validationArr });
      } else {
        next();
      }
    } catch (error) {
      next(new Error("CATCH ERROR: " + error.message, { cause: 500 }));
    }
  };
};

export const signUp = {
  body: joi
    .object()
    .required()
    .keys({
      userName: joi.string().required().min(2).max(20).messages({
        "any.required": "Please enter your username",
        "string.empty": "Please enter your username",
        "string.max": "length must be less than or equal to 20 characters long",
        "string.min": "length must be at least 2 characters long",
      }),
      email: joi.string().required().email().messages({
        "any.required": "Please Enter Your Email",
        "string.empty": "Email Is Required",
        "string.email": "Please Enter Valid Email",
      }),
      password: joi
        .string()
        .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])/))
        .min(8)
        .required()
        .messages({
          "string.base": "Password must be a string.",
          "string.pattern.base":
            "Invalid password format. Must include at least one uppercase letter, one lowercase letter, and one number.",
          "string.pattern.invert.base":
            "Invalid characters in the password. Use only letters and numbers.",
          "string.min": "Password must be at least 8 characters long.",
          "any.required": "Password is required.",
        }),
      cPassword: joi.string().valid(joi.ref("password")).required(),
    }),
};
export const signIn = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi.string().required().email().messages({
        "any.required": "Please Enter Your Email",
        "string.empty": "Email Is Required",
        "string.email": "Please Enter Valid Email",
      }),
      password: joi.string().required().messages({
        "any.required": "Password is required.",
        "string.empty": "Password is required.",
      }),
    }),
};
