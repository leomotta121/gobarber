import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

class AppointmentController {
  async index(req, res) {
    const { page } = req.query;
    const perPage = 1;

    const appointments = await Appointment.findAndCountAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: perPage,
      offset: (page - 1) * perPage,
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
      ],
    });

    const maxPage = Math.ceil(appointments.count / perPage);
    const previousPage = parseInt(page, 10) - 1;
    const hasPreviousPage = previousPage >= 1;
    const nextPage = parseInt(page, 10) + 1;
    const hasNextPage = maxPage > page;
    const currentPage = parseInt(page, 10);

    return res.json({
      appointments: appointments.rows,
      maxPage,
      currentPage,
      previousPage,
      nextPage,
      hasNextPage,
      hasPreviousPage,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    /**
     * Check if provider_id is a provider
     */

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      res
        .status(400)
        .json({ error: 'You can only create appointments with providers' });
    }

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * Check date availability
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointments = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointments);
  }
}

export default new AppointmentController();
