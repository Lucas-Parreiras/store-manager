const allSales = [
    {
      "saleId": 1,
      "date": "2023-05-16T22:20:25.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "saleId": 1,
      "date": "2023-05-16T22:20:25.000Z",
      "productId": 2,
      "quantity": 10
    },
    {
      "saleId": 2,
      "date": "2023-05-16T22:20:25.000Z",
      "productId": 3,
      "quantity": 15
    }
  ];

const saleId1 = [
    {
      "date": "2023-05-16T22:20:25.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "date": "2023-05-16T22:20:25.000Z",
      "productId": 2,
      "quantity": 10
    }
  ];

const newSale = [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ];

const newInvalidIdSale = [
    {
      "productId": 9,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ];

const rightReturnNew = {
        id: 3,
        itemsSold: newSale,
};  

module.exports = {
    allSales,
    saleId1,
    newSale,
    newInvalidIdSale,
    rightReturnNew,
};