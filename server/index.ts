import { getApp } from './server';

const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV === 'development';

const app = getApp(isDev);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
