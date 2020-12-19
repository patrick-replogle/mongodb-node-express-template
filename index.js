require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./api/app');
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`***Server running on port ${PORT}***`);
    })
  )
  .catch((e) => console.error(e));
