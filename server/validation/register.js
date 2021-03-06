const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSignUpInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Field is required";
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.passwordLength = "Password must be at least 6 characters";
    }
  if(Validator.isLength(data.password, { min: 6 })) {
    if (!Validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = "Passwords must match";
      }
  }

// Agree to Terms & Conditions Checkbox checks
  if(Validator.equals(`${data.agreedTerms}`, 'false')) {
    errors.agreedTerms = "You must agree to the terms before submitting!";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};