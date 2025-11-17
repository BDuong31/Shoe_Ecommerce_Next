const MOCK_IMAGE_URL = 'https://placehold.co/500x500/000000/FFFFFF?text=Product+Image';
const MOCK_THUMBNAIL_URL = 'https://placehold.co/100x100/333333/FFFFFF?text=Thumb';


export const mockCartItems = [
  {
    id: 101, // ID của item trong giỏ hàng (Cart Item ID)
    qty: 2, // Số lượng item này trong giỏ
    size: 'M',
    product: {
      id: 50, // ID của sản phẩm thực tế
      attributes: {
        title: 'Áo Thun Cotton Cao Cấp',
        price: 35.99,
        sizes: { data: [{ id: 1, name: 'S' }, { id: 2, name: 'M' }, { id: 3, name: 'L' }] },
        category: { data: { attributes: { title: 'Áo' } } },
        photos: {
          data: [
            { attributes: { url: MOCK_IMAGE_URL + 1 } },
          ],
        },
      },
    },
  },
  {
    id: 102,
    qty: 1,
    size: 'L',
    product: {
      id: 51,
      attributes: {
        title: 'Quần Jeans Slim-fit Xanh Đậm',
        price: 59.50,
        sizes: { data: [{ id: 4, name: 'L' }, { id: 5, name: 'XL' }] },
        category: { data: { attributes: { title: 'Quần' } } },
        photos: {
          data: [
            { attributes: { url: MOCK_IMAGE_URL + 2 } },
          ],
        },
      },
    },
  },
  {
    id: 103,
    qty: 3,
    size: '39',
    product: {
      id: 52,
      attributes: {
        title: 'Giày Sneaker Da Lộn Trắng',
        price: 89.00,
        sizes: { data: [{ id: 6, name: '39' }, { id: 7, name: '40' }, { id: 8, name: '41' }] },
        category: { data: { attributes: { title: 'Giày Dép' } } },
        photos: {
          data: [
            { attributes: { url: MOCK_IMAGE_URL + 3 } },
          ],
        },
      },
    },
  },
  {
    id: 104,
    qty: 1,
    size: 'One Size',
    product: {
      id: 53,
      attributes: {
        title: 'Balo Du Lịch Chống Nước',
        price: 75.00,
        sizes: { data: [{ id: 9, name: 'One Size' }] },
        category: { data: { attributes: { title: 'Phụ Kiện' } } },
        photos: {
          data: [
            { attributes: { url: MOCK_IMAGE_URL + 4 } },
          ],
        },
      },
    },
  },
  {
    id: 105,
    qty: 5,
    size: 'S',
    product: {
      id: 54,
      attributes: {
        title: 'Tất (Vớ) Cổ Ngắn Set 5 Đôi',
        price: 9.99,
        sizes: { data: [{ id: 10, name: 'S' }, { id: 11, name: 'M' }] },
        category: { data: { attributes: { title: 'Phụ Kiện' } } },
        photos: {
          data: [
            { attributes: { url: MOCK_IMAGE_URL + 5 } },
          ],
        },
      },
    },
  },
  {
    id: 106,
    qty: 1,
    size: 'XL',
    product: {
      id: 55,
      attributes: {
        title: 'Áo Khoác Bomber Đen',
        price: 110.25,
        sizes: { data: [{ id: 12, name: 'L' }, { id: 13, name: 'XL' }] },
        category: { data: { attributes: { title: 'Áo Khoác' } } },
        photos: {
          data: [
            { attributes: { url: MOCK_IMAGE_URL + 6 } },
          ],
        },
      },
    },
  },
];
