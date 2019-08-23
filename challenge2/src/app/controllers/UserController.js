import User from '../models/User';
import ApiError from '../../helpers/apiError';
import schemas from '../../helpers/yupSchemas';

class UserController {
  async sotore(req, res, next) {
    try {
      await schemas
        .user()
        .validate(req.body, { abortEarly: false })
        .catch(errors => {
          const schemaErrors = errors.inner.map(err => {
            return { field: err.path, message: err.message };
          });
          throw new ApiError(
            'Validation Error.',
            'Some fields are not valid.',
            400,
            schemaErrors
          );
        });

      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists)
        throw new ApiError(
          'User exists.',
          'The user you are trying to store already exists with this email in our database.',
          400
        );

      const { id, first_name, last_name, email } = await User.create(req.body);

      return res.json({
        id,
        first_name,
        last_name,
        email,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
