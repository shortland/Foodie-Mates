// Utility function to check if all required fields exist and are not empty
export const validateRequiredFields = (data, ignoreFields = []) => {
    for (const [key, value] of Object.entries(data)) {
      if (!ignoreFields.includes(key) && (value === "" || value === null || value === undefined)) {
        return false;
      }
    }
    return true;
  };
  