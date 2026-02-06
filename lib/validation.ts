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
  phone: string;
  place: string;
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

  // Validate phone
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    errors.phone = "Phone number should be 10 digits and start with 6, 7, 8, or 9";
  }

  // Validate place
  if (!formData.place.trim()) {
    errors.place = "Place is required";
  }

  // Validate profession
  if (!formData.profession.trim()) {
    errors.profession = "Profession is required";
  }

  // Validate age
  if (!formData.age.trim()) {
    errors.age = "Age is required";
  } else {
    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      errors.age = "Please enter a valid age (1-120)";
    }
  }

  return errors;
};
