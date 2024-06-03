
import { isEmail } from "validator";

export  const vInputValidation = (value) => {
    if (value.length < 3 || value.length > 100) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 100 characters.
        </div>
      );
    }
  };
  export const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  export const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  