export const validateField = (value, fieldType, required = true) => {
  if (required && (!value || value.trim() === '')) {
    return { isValid: false, message: 'This field is required' };
  }

  if (!value) return { isValid: true, message: '' };

  switch (fieldType) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { isValid: false, message: 'Please enter a valid email address' };
      }
      break;
    
    case 'url':
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(value)) {
        return { isValid: false, message: 'Please enter a valid URL starting with http:// or https://' };
      }
      break;
    
    case 'phone':
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
        return { isValid: false, message: 'Please enter a valid phone number' };
      }
      break;
    
    case 'text':
      if (value.length > 200) {
        return { isValid: false, message: 'Text must be less than 200 characters' };
      }
      break;
    
    case 'textarea':
      if (value.length > 1000) {
        return { isValid: false, message: 'Content must be less than 1000 characters' };
      }
      break;
  }

  return { isValid: true, message: '' };
};

export const validateContent = (content, template) => {
  const errors = {};
  
  if (!template) {
    return { isValid: false, errors: { general: 'No template selected' } };
  }

  // Validate required sections
  template.layout.forEach(section => {
    const sectionContent = content[section];
    
    if (section === 'header') {
      if (!sectionContent?.title && !sectionContent?.logo) {
        errors.header = 'Header title or logo is required';
      }
    }
    
    if (section === 'hero') {
      if (!sectionContent?.title) {
        errors.hero = 'Hero title is required';
      }
    }
    
    if (section === 'contact') {
      if (!sectionContent?.email && !sectionContent?.phone) {
        errors.contact = 'At least one contact method (email or phone) is required';
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const getFieldValidation = (fieldName, fieldType) => {
  const validations = {
    title: { type: 'text', required: true },
    subtitle: { type: 'text', required: false },
    content: { type: 'textarea', required: false },
    email: { type: 'email', required: false },
    phone: { type: 'phone', required: false },
    url: { type: 'url', required: false },
    logo: { type: 'text', required: false },
    address: { type: 'textarea', required: false },
    hours: { type: 'text', required: false },
    company: { type: 'text', required: false },
    description: { type: 'textarea', required: false }
  };

  return validations[fieldName] || { type: 'text', required: false };
}; 