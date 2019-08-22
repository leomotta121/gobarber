import app from './app';
import appConfig from './config/appConfig';

app.listen(appConfig.PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`running on port ${appConfig.PORT}`)
);
