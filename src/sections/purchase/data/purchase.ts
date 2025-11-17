export const product = {
  name: 'DROPSET TRAINER SHOES',
  description: "Men's Road Running Shoes",
  color: 'Enamel Blue/ University White',
  size: 10,
  quantity: 1,
  price: 130.00,
  imageUrl: '/shoes.jpg', 
};

export const info = {
  email: 'abc@gmail.com',
  phone: '0123456789',
  firstName: 'Firstname',
  lastName: 'LastName',
  deliveryAddress: 'delivery address',
};

export const payment = {
  subtotal: 130.00,
  delivery: 6.99,
  salesTax: 0.00,
  total: 136.99,
  paymentMethod: 'Cash of delivery',
};

const statusOptions = ['processing', 'shipped', 'delivered', 'cancelled', 'completed'];

export const orders = [
  {
    id: 'ada43434424sdfs_1',
    status: statusOptions[0],
    orderId: 'ada43434424sdfs',
    items: [product, product], 
    total: 136.99,
    customerInfo: info,
    paymentInfo: payment,
    currentStep: 0,
  },
  {
    id: 'ada43434424sdfs_2',
    status: statusOptions[1],
    orderId: 'ada43434424sdff',
    items: [product], 
    total: 136.99,
    customerInfo: info,
    paymentInfo: payment,
    currentStep: 1,
  },
  {
    id: 'ada43434424sdfs_3',
    status: statusOptions[2],
    orderId: 'ada43434424sdfq',
    items: [product, product, product], 
    total: 409.97,
    customerInfo: info,
    paymentInfo: payment,
    currentStep: 2,
  },
  {
    id: 'ada43434424sdfs_4',
    status: statusOptions[3],
    orderId: 'ada43434424sdfr',
    items: [product], 
    total: 136.99,
    customerInfo: info,
    paymentInfo: payment,
    currentStep: 3,
  },
  {
    id: 'ada43434424sdfs_5',
    status: statusOptions[4],
    orderId: 'ada43434424sdfst',
    items: [product, product],
    total: 273.98,
  }
];