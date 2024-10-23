require('dotenv').config();
const fs = require('fs');

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT, 10),
  },
};

const jsonConfig = JSON.stringify(config, null, 2);

fs.mkdir('./config', { recursive: true }, (err) => {
  if (err) {
    console.error('Failed to create config directory:', err);
    return;
  }

  fs.writeFile('./config/config.json', jsonConfig, (err) => {
    if (err) {
      console.error('Failed to write config.json:', err);
      return;
    }
    console.log('config.json has been created successfully.');
  });
});
