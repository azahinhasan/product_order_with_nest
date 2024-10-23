# Application Documentation

This project is a GraphQL-based API that allows users to interact with authentication, orders, and products. The API includes features for user registration, login, managing orders, and managing products.

## Table of Contents
1. [Teconology](#teconology)
2. [Installation](#installation)
3. [GraphQL Usage](#graphql-usage)
    - [Mutations](#mutations)
    - [Queries](#queries)
4. [Authentication](#authentication)
5. [License](#license)


## Teconology
  - Node 20
  - Nest JS 10
  - GraphQL
  - Sequelize ORM
  - Typescript
  - JWT
  - PostgreSQL 16

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/azahinhasan/product_order_with_nest.git
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Setup Database
  - Create a PostgreSQL database.
  - Create a `.env` file and provide all info. For reference check `.env.example`.
  - Run following commands to cerate tables with indexing
     ```bash
    npm run migrate
    ```
  - [Optional] Seed 0.1 milion data into table run this
    ```bash
    npm run seed
    ```
4. Start the server:
    ```bash
    npm run start:dev
    ```
5. Navigate to the GraphQL playground at `http://localhost:5212/graphql` (or your configured port) and do post request.

## GraphQL Usage

### Mutations
Below are some example mutations that can be used with this API.

```graphql
# AuthResolver: Sign Up Mutation
mutation {
  signup(username: "testUser", password: "password123", name: "Test User") {
    id
    username
    name
  }
}

# AuthResolver: Login Mutation
mutation {
  login(username: "testUser", password: "password123")
}

[⭕ ps: use this token for authentication. Send it into headers such as: Authorization: Bearer token]

# ProductsResolver: Add Product Mutation
mutation {
  addProduct(input: { name: "New Product", price: 99, category: "Electronics" }) {
    id
    name
    price
    category
  }
}

# ProductsResolver: Update Product Mutation
mutation {
  updateProduct(id: 1, name: "Updated Product", price: 89, category: "Updated Category") {
    id
    name
    price
    category
  }
}

# ProductsResolver: Delete Product Mutation
mutation {
  deleteProduct(id: 1)
}

# OrdersResolver: Place Order Mutation
[ps: user id will be get from token]

mutation {
  placeOrder(input: { productId: 2, quantity: 2 }) {
    id
    userId
    productId
    quantity
    totalPrice
  }
}


# OrdersResolver: Cancel Order Mutation
mutation {
  cancelOrder(orderId: 1)
}

```
### Queries
Below are some example queries that can be used with this API.

```graphql
# OrdersResolver: Get User Orders Query
query {
  getUserOrders(userId: 1) {
    id
    userId
    productId
    quantity
    totalPrice
  }
}

# OrdersResolver: Get Users with Orders Query
query {
  getUsersWithOrders(pagination: { page: 1, limit: 10 }) {
    totalCount
    totalPages
    currentPage
    data {
      id
      username
      name
      orders {
        id
        quantity
        totalPrice
        product {
          name
          price
        }
      }
    }
  }
}

# OrdersResolver: Get Top Users by Order Count Query
query {
  getTopUsersByOrderCount {
    id
    username
    name
  }
}

# ProductsResolver: Get Products Query
query {
  getProducts(pagination: { page: 1, limit: 10 }) {
    totalCount
    totalPages
    currentPage
    data {
      id
      name
      price
      category
    }
  }
}

# ProductsResolver: Get Total Sales by Category Query
query {
  getTotalSalesByCategory {
    category
    totalsales
    totalsoldproducts
  }
}
```


