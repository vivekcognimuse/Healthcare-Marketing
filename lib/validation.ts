export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  place?: string;
  profession?: string;
  age?: string;
}

export interface PodcastFormData {
  name: string;
  email: string;
  profession: string;
  age: string;
}

export const validatePodcastForm = (formData: PodcastFormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate name
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  } else if (/^[^a-zA-Z]/.test(formData.name.trim())) {
    errors.name = "Name should not start with a number or special character";
  }

  // Validate email
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
  }
  // Validate profession
  if (!formData.profession.trim()) {
    errors.profession = "Profession is required";
  }

  // Validate age (should be selected)
  if (!formData.age.trim()) {
    errors.age = "Please select an age range";
  }

  return errors;
};
