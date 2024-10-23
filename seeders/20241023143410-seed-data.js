const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userBatchSize = 10;
    const productBatchSize = 1000;
    const orderBatchSize = 1000;

    const users = [];
    for (let i = 0; i < 10; i++) {
      const hashedPassword = await bcrypt.hash(`user${i}`, 10);
      users.push({
        username: `user${i}`,
        password: hashedPassword,
        name: faker.person.fullName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (users.length === userBatchSize) {
        await queryInterface.bulkInsert('Users', users);
        users.length = 0;
      }
    }

    if (users.length > 0) {
      await queryInterface.bulkInsert('Users', users);
    }

    const products = [];
    for (let i = 0; i < 100000; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: faker.number.int({ min: 10, max: 1000 }),
        category: faker.commerce.department(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (products.length === productBatchSize) {
        await queryInterface.bulkInsert('Products', products);
        products.length = 0;
      }
    }

    if (products.length > 0) {
      await queryInterface.bulkInsert('Products', products);
    }

    const orders = [];
    for (let i = 0; i < 100000; i++) {
      orders.push({
        userId: faker.number.int({ min: 1, max: 10 }),
        productId: faker.number.int({ min: 1, max: 100000 }),
        quantity: faker.number.int({ min: 1, max: 10 }),
        totalPrice: faker.number.int({ min: 10, max: 10000 }),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (orders.length === orderBatchSize) {
        await queryInterface.bulkInsert('Orders', orders);
        orders.length = 0;
      }
    }

    if (orders.length > 0) {
      await queryInterface.bulkInsert('Orders', orders);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
