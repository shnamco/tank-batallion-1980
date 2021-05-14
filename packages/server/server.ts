import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './src/models';
import routes from './src/routes/turorial.routes';

const app = express();

routes(app);

const corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to tank battalion api.' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
