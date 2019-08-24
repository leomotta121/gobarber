import * as Yup from 'yup';

const errorMessages = {
  first_name: {
    required: 'first_name is required.',
  },
  last_name: {
    required: 'last_name is required.',
  },
  email: {
    required: 'email is required.',
    isEmail: 'Not valid email.',
  },
  password: {
    required: 'password is required.',
    min: 'password must have at least 6 characters.',
  },
  confirm_password: {
    required: 'confirm_password is required.',
    min: 'password must have at least 6 characters.',
  },
};

export default {
  storeUser: Yup.object().shape({
    first_name: Yup.string().required(errorMessages.first_name.required),

    last_name: Yup.string().required(errorMessages.last_name.required),

    email: Yup.string()
      .email(errorMessages.email.isEmail)
      .required(errorMessages.email.required),

    password: Yup.string()
      .required(errorMessages.password.required)
      .min(6, errorMessages.password.min),

    confirm_password: Yup.string()
      .required(errorMessages.confirm_password.required)
      .min(6, errorMessages.password.min),
  }),

  updateUser: Yup.object().shape({
    first_name: Yup.string(),

    last_name: Yup.string(),

    email: Yup.string().email(errorMessages.email.required),

    oldPassword: Yup.string().min(6, errorMessages.password.min),

    password: Yup.string()
      .min(6, errorMessages.password.min)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required(errorMessages.password.required) : field
      ),

    confirm_password: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required(errorMessages.confirm_password.required)
            .oneOf([Yup.ref('password')])
        : field
    ),
  }),
};
