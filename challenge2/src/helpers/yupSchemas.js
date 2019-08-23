import * as Yup from 'yup';

export default {
  user: function user() {
    return Yup.object().shape({
      first_name: Yup.string().required('name is required'),
      last_name: Yup.string().required('last name is required'),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
  },
};
