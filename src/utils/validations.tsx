export const validateUsername = (value: string) => {
    const result = { isValid: true, error: "" };
  
    if (!value) {
      result.isValid = false;
      result.error = "Field cannot be empty!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      result.isValid = false;
      result.error = "Invalid username!";
    }
  
    return result;
  };
  
  export const validatePassword = (value: string) => {
      const result = { isValid: true, error: "" };
  
      if (!value) {
        result.isValid = false;
        result.error = "Field cannot be empty!";
      } else if (value.length < 6) {
          result.isValid = false;
          result.error = "Password must have a minimum length of 6 characters!";
      } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
        result.isValid = false;
        result.error = "Password must contain at least one letter and one digit!";
      }
    
      return result;
  }