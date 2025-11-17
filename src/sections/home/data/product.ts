const mockProduct = [
    {
        "id": "4a3369b4-ebb6-4306-8696-85d56ac37ea2",
        "productName": "Vans Hoodie Model 1",
        "price": 112,
        "description": "The Vans Hoodie Model 1 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:10:58Z",
        "updatedAt": "2024-10-30T04:10:58Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:10:58Z",
            "updatedAt": "2024-10-30T04:10:58Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:10:58Z",
            "updatedAt": "2024-10-30T04:10:58Z"
        },
        "averageRating": {
            "productId": "4a3369b4-ebb6-4306-8696-85d56ac37ea2",
            "avgRating": 3.9,
            "totalRating": 66
        }
    },
    {
        "id": "3b36a256-b499-4bee-919d-1802652e75d6",
        "productName": "Adidas Hoodie Model 2",
        "price": 266,
        "description": "The Adidas Hoodie Model 2 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:11:03Z",
        "updatedAt": "2024-10-30T04:11:03Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:11:03Z",
            "updatedAt": "2024-10-30T04:11:03Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:11:03Z",
            "updatedAt": "2024-10-30T04:11:03Z"
        },
        "averageRating": {
            "productId": "3b36a256-b499-4bee-919d-1802652e75d6",
            "avgRating": 4.1,
            "totalRating": 448
        }
    },
    {
        "id": "adc0f58b-d23e-436b-8479-2276ad3bdd0e",
        "productName": "Vans Hoodie Model 3",
        "price": 98,
        "description": "The Vans Hoodie Model 3 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:11:08Z",
        "updatedAt": "2024-10-30T04:11:08Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:11:08Z",
            "updatedAt": "2024-10-30T04:11:08Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:11:08Z",
            "updatedAt": "2024-10-30T04:11:08Z"
        },
        "averageRating": {
            "productId": "adc0f58b-d23e-436b-8479-2276ad3bdd0e",
            "avgRating": 4.8,
            "totalRating": 244
        }
    },
    {
        "id": "f347d1f3-6de2-45ae-8ed2-1bc3d65bef46",
        "productName": "New Balance T-Shirt Model 4",
        "price": 97,
        "description": "The New Balance T-Shirt Model 4 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:11:13Z",
        "updatedAt": "2024-10-30T04:11:13Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:11:13Z",
            "updatedAt": "2024-10-30T04:11:13Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:11:13Z",
            "updatedAt": "2024-10-30T04:11:13Z"
        },
        "averageRating": {
            "productId": "f347d1f3-6de2-45ae-8ed2-1bc3d65bef46",
            "avgRating": 4.4,
            "totalRating": 130
        }
    },
    {
        "id": "97b98f45-5a80-4036-8926-c0d00445a49a",
        "productName": "Nike Shoes Model 5",
        "price": 215,
        "description": "The Nike Shoes Model 5 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:11:18Z",
        "updatedAt": "2024-10-30T04:11:18Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:11:18Z",
            "updatedAt": "2024-10-30T04:11:18Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:11:18Z",
            "updatedAt": "2024-10-30T04:11:18Z"
        },
        "averageRating": {
            "productId": "97b98f45-5a80-4036-8926-c0d00445a49a",
            "avgRating": 4.1,
            "totalRating": 384
        }
    },
    {
        "id": "2893db62-8815-490b-b976-a518b21691c6",
        "productName": "Puma Shoes Model 6",
        "price": 282,
        "description": "The Puma Shoes Model 6 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-puma",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:11:23Z",
        "updatedAt": "2024-10-30T04:11:23Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-puma",
            "brandName": "Puma",
            "createdAt": "2024-10-30T04:11:23Z",
            "updatedAt": "2024-10-30T04:11:23Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:11:23Z",
            "updatedAt": "2024-10-30T04:11:23Z"
        },
        "averageRating": {
            "productId": "2893db62-8815-490b-b976-a518b21691c6",
            "avgRating": 4.3,
            "totalRating": 338
        }
    },
    {
        "id": "9536aae7-a961-4908-9745-99c000f77fb0",
        "productName": "Vans Shoes Model 7",
        "price": 98,
        "description": "The Vans Shoes Model 7 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:11:28Z",
        "updatedAt": "2024-10-30T04:11:28Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:11:28Z",
            "updatedAt": "2024-10-30T04:11:28Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:11:28Z",
            "updatedAt": "2024-10-30T04:11:28Z"
        },
        "averageRating": {
            "productId": "9536aae7-a961-4908-9745-99c000f77fb0",
            "avgRating": 3.8,
            "totalRating": 36
        }
    },
    {
        "id": "d8872fa5-7526-4558-8a74-e1077e99d07e",
        "productName": "Converse Shoes Model 8",
        "price": 98,
        "description": "The Converse Shoes Model 8 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:11:33Z",
        "updatedAt": "2024-10-30T04:11:33Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:11:33Z",
            "updatedAt": "2024-10-30T04:11:33Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:11:33Z",
            "updatedAt": "2024-10-30T04:11:33Z"
        },
        "averageRating": {
            "productId": "d8872fa5-7526-4558-8a74-e1077e99d07e",
            "avgRating": 4.3,
            "totalRating": 138
        }
    },
    {
        "id": "bcc25edf-67de-48e3-a80b-28b0ac623e44",
        "productName": "Converse Pants Model 9",
        "price": 286,
        "description": "The Converse Pants Model 9 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:11:38Z",
        "updatedAt": "2024-10-30T04:11:38Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:11:38Z",
            "updatedAt": "2024-10-30T04:11:38Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:11:38Z",
            "updatedAt": "2024-10-30T04:11:38Z"
        },
        "averageRating": {
            "productId": "bcc25edf-67de-48e3-a80b-28b0ac623e44",
            "avgRating": 4.7,
            "totalRating": 72
        }
    },
    {
        "id": "afffafe7-64be-4c8c-905d-e20cf7a2481e",
        "productName": "Puma Hoodie Model 10",
        "price": 262,
        "description": "The Puma Hoodie Model 10 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-puma",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:11:43Z",
        "updatedAt": "2024-10-30T04:11:43Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-puma",
            "brandName": "Puma",
            "createdAt": "2024-10-30T04:11:43Z",
            "updatedAt": "2024-10-30T04:11:43Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:11:43Z",
            "updatedAt": "2024-10-30T04:11:43Z"
        },
        "averageRating": {
            "productId": "afffafe7-64be-4c8c-905d-e20cf7a2481e",
            "avgRating": 4.3,
            "totalRating": 334
        }
    },
    {
        "id": "65bdfe97-7195-44f2-86d1-156ec0da4025",
        "productName": "New Balance Hoodie Model 11",
        "price": 73,
        "description": "The New Balance Hoodie Model 11 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:11:48Z",
        "updatedAt": "2024-10-30T04:11:48Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:11:48Z",
            "updatedAt": "2024-10-30T04:11:48Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:11:48Z",
            "updatedAt": "2024-10-30T04:11:48Z"
        },
        "averageRating": {
            "productId": "65bdfe97-7195-44f2-86d1-156ec0da4025",
            "avgRating": 3.8,
            "totalRating": 90
        }
    },
    {
        "id": "4b333214-14cd-40bc-8b5c-847c1178d6ab",
        "productName": "Vans Shoes Model 12",
        "price": 109,
        "description": "The Vans Shoes Model 12 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:11:53Z",
        "updatedAt": "2024-10-30T04:11:53Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:11:53Z",
            "updatedAt": "2024-10-30T04:11:53Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:11:53Z",
            "updatedAt": "2024-10-30T04:11:53Z"
        },
        "averageRating": {
            "productId": "4b333214-14cd-40bc-8b5c-847c1178d6ab",
            "avgRating": 4.6,
            "totalRating": 438
        }
    },
    {
        "id": "b1e9a09d-c5dd-41bf-865b-d99378f5fe8c",
        "productName": "Adidas Hoodie Model 13",
        "price": 298,
        "description": "The Adidas Hoodie Model 13 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:11:58Z",
        "updatedAt": "2024-10-30T04:11:58Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:11:58Z",
            "updatedAt": "2024-10-30T04:11:58Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:11:58Z",
            "updatedAt": "2024-10-30T04:11:58Z"
        },
        "averageRating": {
            "productId": "b1e9a09d-c5dd-41bf-865b-d99378f5fe8c",
            "avgRating": 4.9,
            "totalRating": 28
        }
    },
    {
        "id": "fdfbde04-ea3a-4d36-a403-cca217e1a4e0",
        "productName": "Adidas Accessories Model 14",
        "price": 190,
        "description": "The Adidas Accessories Model 14 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:12:03Z",
        "updatedAt": "2024-10-30T04:12:03Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:12:03Z",
            "updatedAt": "2024-10-30T04:12:03Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:12:03Z",
            "updatedAt": "2024-10-30T04:12:03Z"
        },
        "averageRating": {
            "productId": "fdfbde04-ea3a-4d36-a403-cca217e1a4e0",
            "avgRating": 3.9,
            "totalRating": 215
        }
    },
    {
        "id": "5384bffe-12c0-48a8-9786-5fa7a2e4d4b9",
        "productName": "Nike Pants Model 15",
        "price": 106,
        "description": "The Nike Pants Model 15 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:12:08Z",
        "updatedAt": "2024-10-30T04:12:08Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:12:08Z",
            "updatedAt": "2024-10-30T04:12:08Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:12:08Z",
            "updatedAt": "2024-10-30T04:12:08Z"
        },
        "averageRating": {
            "productId": "5384bffe-12c0-48a8-9786-5fa7a2e4d4b9",
            "avgRating": 3.9,
            "totalRating": 296
        }
    },
    {
        "id": "f5104f15-c41b-4b2e-bfb4-287ed452768e",
        "productName": "Nike Accessories Model 16",
        "price": 126,
        "description": "The Nike Accessories Model 16 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:12:13Z",
        "updatedAt": "2024-10-30T04:12:13Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:12:13Z",
            "updatedAt": "2024-10-30T04:12:13Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:12:13Z",
            "updatedAt": "2024-10-30T04:12:13Z"
        },
        "averageRating": {
            "productId": "f5104f15-c41b-4b2e-bfb4-287ed452768e",
            "avgRating": 4.2,
            "totalRating": 161
        }
    },
    {
        "id": "3bdbea71-a20f-4d8f-bca3-65a61f6fc44d",
        "productName": "New Balance Hoodie Model 17",
        "price": 178,
        "description": "The New Balance Hoodie Model 17 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:12:18Z",
        "updatedAt": "2024-10-30T04:12:18Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:12:18Z",
            "updatedAt": "2024-10-30T04:12:18Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:12:18Z",
            "updatedAt": "2024-10-30T04:12:18Z"
        },
        "averageRating": {
            "productId": "3bdbea71-a20f-4d8f-bca3-65a61f6fc44d",
            "avgRating": 3.9,
            "totalRating": 385
        }
    },
    {
        "id": "8046c48e-b878-4be4-82d6-c7728cb61289",
        "productName": "Vans Pants Model 18",
        "price": 198,
        "description": "The Vans Pants Model 18 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:12:23Z",
        "updatedAt": "2024-10-30T04:12:23Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:12:23Z",
            "updatedAt": "2024-10-30T04:12:23Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:12:23Z",
            "updatedAt": "2024-10-30T04:12:23Z"
        },
        "averageRating": {
            "productId": "8046c48e-b878-4be4-82d6-c7728cb61289",
            "avgRating": 4.0,
            "totalRating": 358
        }
    },
    {
        "id": "f7ea6a57-2c87-4857-9084-35727b3c5322",
        "productName": "Converse Accessories Model 19",
        "price": 69,
        "description": "The Converse Accessories Model 19 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:12:28Z",
        "updatedAt": "2024-10-30T04:12:28Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:12:28Z",
            "updatedAt": "2024-10-30T04:12:28Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:12:28Z",
            "updatedAt": "2024-10-30T04:12:28Z"
        },
        "averageRating": {
            "productId": "f7ea6a57-2c87-4857-9084-35727b3c5322",
            "avgRating": 4.1,
            "totalRating": 437
        }
    },
    {
        "id": "344ae679-d187-477f-a238-ae872ad11f6f",
        "productName": "Converse T-Shirt Model 20",
        "price": 222,
        "description": "The Converse T-Shirt Model 20 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:12:33Z",
        "updatedAt": "2024-10-30T04:12:33Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:12:33Z",
            "updatedAt": "2024-10-30T04:12:33Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:12:33Z",
            "updatedAt": "2024-10-30T04:12:33Z"
        },
        "averageRating": {
            "productId": "344ae679-d187-477f-a238-ae872ad11f6f",
            "avgRating": 4.0,
            "totalRating": 80
        }
    },
    {
        "id": "012a66a0-f471-4f7e-bf4f-70c14ef56e83",
        "productName": "Vans T-Shirt Model 21",
        "price": 205,
        "description": "The Vans T-Shirt Model 21 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:12:38Z",
        "updatedAt": "2024-10-30T04:12:38Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:12:38Z",
            "updatedAt": "2024-10-30T04:12:38Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:12:38Z",
            "updatedAt": "2024-10-30T04:12:38Z"
        },
        "averageRating": {
            "productId": "012a66a0-f471-4f7e-bf4f-70c14ef56e83",
            "avgRating": 4.4,
            "totalRating": 267
        }
    },
    {
        "id": "924de12b-d0ff-41ce-9067-80aa4554be13",
        "productName": "Vans Hoodie Model 22",
        "price": 79,
        "description": "The Vans Hoodie Model 22 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:12:43Z",
        "updatedAt": "2024-10-30T04:12:43Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:12:43Z",
            "updatedAt": "2024-10-30T04:12:43Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:12:43Z",
            "updatedAt": "2024-10-30T04:12:43Z"
        },
        "averageRating": {
            "productId": "924de12b-d0ff-41ce-9067-80aa4554be13",
            "avgRating": 4.8,
            "totalRating": 278
        }
    },
    {
        "id": "334699bd-4556-4eb7-8ec0-e5353999f00b",
        "productName": "Converse Hoodie Model 23",
        "price": 270,
        "description": "The Converse Hoodie Model 23 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:12:48Z",
        "updatedAt": "2024-10-30T04:12:48Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:12:48Z",
            "updatedAt": "2024-10-30T04:12:48Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:12:48Z",
            "updatedAt": "2024-10-30T04:12:48Z"
        },
        "averageRating": {
            "productId": "334699bd-4556-4eb7-8ec0-e5353999f00b",
            "avgRating": 4.3,
            "totalRating": 320
        }
    },
    {
        "id": "ab7e15b2-34c1-41fd-8b59-ad87f33defd7",
        "productName": "Nike Pants Model 24",
        "price": 120,
        "description": "The Nike Pants Model 24 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:12:53Z",
        "updatedAt": "2024-10-30T04:12:53Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:12:53Z",
            "updatedAt": "2024-10-30T04:12:53Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:12:53Z",
            "updatedAt": "2024-10-30T04:12:53Z"
        },
        "averageRating": {
            "productId": "ab7e15b2-34c1-41fd-8b59-ad87f33defd7",
            "avgRating": 3.8,
            "totalRating": 424
        }
    },
    {
        "id": "ce3f23cd-6c30-4ec6-823b-d8a3d03c6593",
        "productName": "Nike Pants Model 25",
        "price": 162,
        "description": "The Nike Pants Model 25 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:12:58Z",
        "updatedAt": "2024-10-30T04:12:58Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:12:58Z",
            "updatedAt": "2024-10-30T04:12:58Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:12:58Z",
            "updatedAt": "2024-10-30T04:12:58Z"
        },
        "averageRating": {
            "productId": "ce3f23cd-6c30-4ec6-823b-d8a3d03c6593",
            "avgRating": 4.7,
            "totalRating": 68
        }
    },
    {
        "id": "a15fbe88-8af2-47ff-9d6d-66367932f036",
        "productName": "Adidas T-Shirt Model 26",
        "price": 288,
        "description": "The Adidas T-Shirt Model 26 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:13:03Z",
        "updatedAt": "2024-10-30T04:13:03Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:13:03Z",
            "updatedAt": "2024-10-30T04:13:03Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:13:03Z",
            "updatedAt": "2024-10-30T04:13:03Z"
        },
        "averageRating": {
            "productId": "a15fbe88-8af2-47ff-9d6d-66367932f036",
            "avgRating": 4.6,
            "totalRating": 279
        }
    },
    {
        "id": "fb95cfcd-ff6a-405e-bd5e-dae1ae9c04a2",
        "productName": "Converse Pants Model 27",
        "price": 265,
        "description": "The Converse Pants Model 27 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:13:08Z",
        "updatedAt": "2024-10-30T04:13:08Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:13:08Z",
            "updatedAt": "2024-10-30T04:13:08Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:13:08Z",
            "updatedAt": "2024-10-30T04:13:08Z"
        },
        "averageRating": {
            "productId": "fb95cfcd-ff6a-405e-bd5e-dae1ae9c04a2",
            "avgRating": 4.0,
            "totalRating": 112
        }
    },
    {
        "id": "dcf72200-470d-423c-8674-2fdc3b09f350",
        "productName": "Vans Accessories Model 28",
        "price": 132,
        "description": "The Vans Accessories Model 28 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:13:13Z",
        "updatedAt": "2024-10-30T04:13:13Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:13:13Z",
            "updatedAt": "2024-10-30T04:13:13Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:13:13Z",
            "updatedAt": "2024-10-30T04:13:13Z"
        },
        "averageRating": {
            "productId": "dcf72200-470d-423c-8674-2fdc3b09f350",
            "avgRating": 4.3,
            "totalRating": 272
        }
    },
    {
        "id": "0385262f-d3c9-4fa5-b8d4-48a64475f8ff",
        "productName": "Vans Accessories Model 29",
        "price": 275,
        "description": "The Vans Accessories Model 29 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:13:18Z",
        "updatedAt": "2024-10-30T04:13:18Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:13:18Z",
            "updatedAt": "2024-10-30T04:13:18Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:13:18Z",
            "updatedAt": "2024-10-30T04:13:18Z"
        },
        "averageRating": {
            "productId": "0385262f-d3c9-4fa5-b8d4-48a64475f8ff",
            "avgRating": 4.1,
            "totalRating": 68
        }
    },
    {
        "id": "ba208da8-72a1-4051-b9d9-60c14d6cb206",
        "productName": "Adidas Accessories Model 30",
        "price": 162,
        "description": "The Adidas Accessories Model 30 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:13:23Z",
        "updatedAt": "2024-10-30T04:13:23Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:13:23Z",
            "updatedAt": "2024-10-30T04:13:23Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:13:23Z",
            "updatedAt": "2024-10-30T04:13:23Z"
        },
        "averageRating": {
            "productId": "ba208da8-72a1-4051-b9d9-60c14d6cb206",
            "avgRating": 3.6,
            "totalRating": 158
        }
    },
    {
        "id": "1c12b947-35a1-45e7-a221-5a4b57c3e50c",
        "productName": "Puma Pants Model 31",
        "price": 281,
        "description": "The Puma Pants Model 31 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-puma",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:13:28Z",
        "updatedAt": "2024-10-30T04:13:28Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-puma",
            "brandName": "Puma",
            "createdAt": "2024-10-30T04:13:28Z",
            "updatedAt": "2024-10-30T04:13:28Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:13:28Z",
            "updatedAt": "2024-10-30T04:13:28Z"
        },
        "averageRating": {
            "productId": "1c12b947-35a1-45e7-a221-5a4b57c3e50c",
            "avgRating": 4.2,
            "totalRating": 350
        }
    },
    {
        "id": "e951fbcd-eb94-4087-8f08-239be067b7f7",
        "productName": "New Balance Hoodie Model 32",
        "price": 132,
        "description": "The New Balance Hoodie Model 32 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:13:33Z",
        "updatedAt": "2024-10-30T04:13:33Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:13:33Z",
            "updatedAt": "2024-10-30T04:13:33Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:13:33Z",
            "updatedAt": "2024-10-30T04:13:33Z"
        },
        "averageRating": {
            "productId": "e951fbcd-eb94-4087-8f08-239be067b7f7",
            "avgRating": 5.0,
            "totalRating": 346
        }
    },
    {
        "id": "03657043-4f02-4d72-a08c-c24628be15d4",
        "productName": "Converse Shoes Model 33",
        "price": 95,
        "description": "The Converse Shoes Model 33 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:13:38Z",
        "updatedAt": "2024-10-30T04:13:38Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:13:38Z",
            "updatedAt": "2024-10-30T04:13:38Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:13:38Z",
            "updatedAt": "2024-10-30T04:13:38Z"
        },
        "averageRating": {
            "productId": "03657043-4f02-4d72-a08c-c24628be15d4",
            "avgRating": 3.8,
            "totalRating": 142
        }
    },
    {
        "id": "10789137-1763-4a6e-90e6-8b1b2009b94f",
        "productName": "Adidas Pants Model 34",
        "price": 108,
        "description": "The Adidas Pants Model 34 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:13:43Z",
        "updatedAt": "2024-10-30T04:13:43Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:13:43Z",
            "updatedAt": "2024-10-30T04:13:43Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:13:43Z",
            "updatedAt": "2024-10-30T04:13:43Z"
        },
        "averageRating": {
            "productId": "10789137-1763-4a6e-90e6-8b1b2009b94f",
            "avgRating": 4.1,
            "totalRating": 417
        }
    },
    {
        "id": "d329623f-fe98-481e-a0b2-fb3e9ee59023",
        "productName": "Nike Hoodie Model 35",
        "price": 142,
        "description": "The Nike Hoodie Model 35 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:13:48Z",
        "updatedAt": "2024-10-30T04:13:48Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:13:48Z",
            "updatedAt": "2024-10-30T04:13:48Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:13:48Z",
            "updatedAt": "2024-10-30T04:13:48Z"
        },
        "averageRating": {
            "productId": "d329623f-fe98-481e-a0b2-fb3e9ee59023",
            "avgRating": 4.7,
            "totalRating": 98
        }
    },
    {
        "id": "ab87a613-32f3-4d03-b5cb-77b83afba67b",
        "productName": "Converse Pants Model 36",
        "price": 276,
        "description": "The Converse Pants Model 36 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:13:53Z",
        "updatedAt": "2024-10-30T04:13:53Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:13:53Z",
            "updatedAt": "2024-10-30T04:13:53Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:13:53Z",
            "updatedAt": "2024-10-30T04:13:53Z"
        },
        "averageRating": {
            "productId": "ab87a613-32f3-4d03-b5cb-77b83afba67b",
            "avgRating": 4.0,
            "totalRating": 363
        }
    },
    {
        "id": "6ecc6007-65d4-4caf-be46-6a91f7530f15",
        "productName": "Adidas T-Shirt Model 37",
        "price": 238,
        "description": "The Adidas T-Shirt Model 37 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:13:58Z",
        "updatedAt": "2024-10-30T04:13:58Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:13:58Z",
            "updatedAt": "2024-10-30T04:13:58Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:13:58Z",
            "updatedAt": "2024-10-30T04:13:58Z"
        },
        "averageRating": {
            "productId": "6ecc6007-65d4-4caf-be46-6a91f7530f15",
            "avgRating": 3.8,
            "totalRating": 190
        }
    },
    {
        "id": "b4478309-d4e6-4e7a-9800-dd24b4c9b345",
        "productName": "New Balance Hoodie Model 38",
        "price": 86,
        "description": "The New Balance Hoodie Model 38 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:14:03Z",
        "updatedAt": "2024-10-30T04:14:03Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:14:03Z",
            "updatedAt": "2024-10-30T04:14:03Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:14:03Z",
            "updatedAt": "2024-10-30T04:14:03Z"
        },
        "averageRating": {
            "productId": "b4478309-d4e6-4e7a-9800-dd24b4c9b345",
            "avgRating": 3.8,
            "totalRating": 228
        }
    },
    {
        "id": "3b4683fa-b4d1-411e-90f2-a614b90d35a0",
        "productName": "New Balance Pants Model 39",
        "price": 168,
        "description": "The New Balance Pants Model 39 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:14:08Z",
        "updatedAt": "2024-10-30T04:14:08Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:14:08Z",
            "updatedAt": "2024-10-30T04:14:08Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:14:08Z",
            "updatedAt": "2024-10-30T04:14:08Z"
        },
        "averageRating": {
            "productId": "3b4683fa-b4d1-411e-90f2-a614b90d35a0",
            "avgRating": 4.8,
            "totalRating": 24
        }
    },
    {
        "id": "c2db4d51-d61b-45ed-aef6-7a6b48cbae65",
        "productName": "Adidas Shoes Model 40",
        "price": 269,
        "description": "The Adidas Shoes Model 40 offers premium comfort, durability, and modern style.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:14:13Z",
        "updatedAt": "2024-10-30T04:14:13Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:14:13Z",
            "updatedAt": "2024-10-30T04:14:13Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:14:13Z",
            "updatedAt": "2024-10-30T04:14:13Z"
        },
        "averageRating": {
            "productId": "c2db4d51-d61b-45ed-aef6-7a6b48cbae65",
            "avgRating": 3.9,
            "totalRating": 399
        }
    },  
    {
        "id": "a4d3e8f1-c7b0-4d56-9a2c-1b3d4f5e6a7b",
        "productName": "Nike T-Shirt Model 41",
        "price": 145,
        "description": "A classic Nike T-Shirt with superior breathability.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:14:18Z",
        "updatedAt": "2024-10-30T04:14:18Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:14:18Z",
            "updatedAt": "2024-10-30T04:14:18Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:14:18Z",
            "updatedAt": "2024-10-30T04:14:18Z"
        },
        "averageRating": {
            "productId": "a4d3e8f1-c7b0-4d56-9a2c-1b3d4f5e6a7b",
            "avgRating": 4.5,
            "totalRating": 310
        }
    },
    {
        "id": "b5e4f9g2-d8c1-4e67-8b3d-2c4e5g6h7i8j",
        "productName": "Puma Accessories Model 42",
        "price": 55,
        "description": "Essential Puma accessory for everyday use.",
        "brandId": "uuid-brand-puma",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:14:23Z",
        "updatedAt": "2024-10-30T04:14:23Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-puma",
            "brandName": "Puma",
            "createdAt": "2024-10-30T04:14:23Z",
            "updatedAt": "2024-10-30T04:14:23Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:14:23Z",
            "updatedAt": "2024-10-30T04:14:23Z"
        },
        "averageRating": {
            "productId": "b5e4f9g2-d8c1-4e67-8b3d-2c4e5g6h7i8j",
            "avgRating": 4.2,
            "totalRating": 180
        }
    },
    {
        "id": "c6f5g0h3-e9d2-4f78-9c4e-3d5f6h7i8j9k",
        "productName": "Converse Shoes Model 43",
        "price": 185,
        "description": "New release Converse shoes, maximum comfort.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:14:28Z",
        "updatedAt": "2024-10-30T04:14:28Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:14:28Z",
            "updatedAt": "2024-10-30T04:14:28Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:14:28Z",
            "updatedAt": "2024-10-30T04:14:28Z"
        },
        "averageRating": {
            "productId": "c6f5g0h3-e9d2-4f78-9c4e-3d5f6h7i8j9k",
            "avgRating": 4.9,
            "totalRating": 512
        }
    },
    {
        "id": "d7g6h1i4-f0e3-4g89-a5d5-4e6g7h8i9j0l",
        "productName": "Adidas Pants Model 44",
        "price": 115,
        "description": "Lightweight and flexible Adidas pants.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:14:33Z",
        "updatedAt": "2024-10-30T04:14:33Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:14:33Z",
            "updatedAt": "2024-10-30T04:14:33Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:14:33Z",
            "updatedAt": "2024-10-30T04:14:33Z"
        },
        "averageRating": {
            "productId": "d7g6h1i4-f0e3-4g89-a5d5-4e6g7h8i9j0l",
            "avgRating": 4.1,
            "totalRating": 205
        }
    },
    {
        "id": "e8h7i2j5-g1f4-4h90-b6e6-5f7h8i9j0l1m",
        "productName": "Vans Hoodie Model 45",
        "price": 125,
        "description": "Cozy Vans hoodie for a casual look.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:14:38Z",
        "updatedAt": "2024-10-30T04:14:38Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:14:38Z",
            "updatedAt": "2024-10-30T04:14:38Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:14:38Z",
            "updatedAt": "2024-10-30T04:14:38Z"
        },
        "averageRating": {
            "productId": "e8h7i2j5-g1f4-4h90-b6e6-5f7h8i9j0l1m",
            "avgRating": 3.7,
            "totalRating": 95
        }
    },
    {
        "id": "f9i8j3k6-h2g5-4i01-c7f7-6g8i9j0l1m2n",
        "productName": "New Balance Shoes Model 46",
        "price": 230,
        "description": "New Balance running shoes for performance.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:14:43Z",
        "updatedAt": "2024-10-30T04:14:43Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:14:43Z",
            "updatedAt": "2024-10-30T04:14:43Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:14:43Z",
            "updatedAt": "2024-10-30T04:14:43Z"
        },
        "averageRating": {
            "productId": "f9i8j3k6-h2g5-4i01-c7f7-6g8i9j0l1m2n",
            "avgRating": 4.6,
            "totalRating": 480
        }
    },
    {
        "id": "g0j9k4l7-i3h6-4j12-d8g8-7h9j0l1m2n3o",
        "productName": "Nike Pants Model 47",
        "price": 175,
        "description": "Stylish Nike track pants.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:14:48Z",
        "updatedAt": "2024-10-30T04:14:48Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:14:48Z",
            "updatedAt": "2024-10-30T04:14:48Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:14:48Z",
            "updatedAt": "2024-10-30T04:14:48Z"
        },
        "averageRating": {
            "productId": "g0j9k4l7-i3h6-4j12-d8g8-7h9j0l1m2n3o",
            "avgRating": 4.0,
            "totalRating": 330
        }
    },
    {
        "id": "h1k0l5m8-j4i7-4k23-e9h9-8i0l1m2n3o4p",
        "productName": "Adidas Hoodie Model 48",
        "price": 199,
        "description": "Warm Adidas zip-up hoodie.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:14:53Z",
        "updatedAt": "2024-10-30T04:14:53Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:14:53Z",
            "updatedAt": "2024-10-30T04:14:53Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:14:53Z",
            "updatedAt": "2024-10-30T04:14:53Z"
        },
        "averageRating": {
            "productId": "h1k0l5m8-j4i7-4k23-e9h9-8i0l1m2n3o4p",
            "avgRating": 4.4,
            "totalRating": 270
        }
    },
    {
        "id": "i2l1m6n9-k5j8-4l34-faia-9j1m2n3o4p5q",
        "productName": "Converse T-Shirt Model 49",
        "price": 85,
        "description": "Simple and comfortable Converse t-shirt.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:14:58Z",
        "updatedAt": "2024-10-30T04:14:58Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:14:58Z",
            "updatedAt": "2024-10-30T04:14:58Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:14:58Z",
            "updatedAt": "2024-10-30T04:14:58Z"
        },
        "averageRating": {
            "productId": "i2l1m6n9-k5j8-4l34-faia-9j1m2n3o4p5q",
            "avgRating": 3.9,
            "totalRating": 150
        }
    },
    {
        "id": "j3m2n7o0-l6k9-4m45-gbjb-a0l2m3n4o5p6r",
        "productName": "Vans Shoes Model 50",
        "price": 150,
        "description": "Durable Vans skate shoes.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:15:03Z",
        "updatedAt": "2024-10-30T04:15:03Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:15:03Z",
            "updatedAt": "2024-10-30T04:15:03Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:15:03Z",
            "updatedAt": "2024-10-30T04:15:03Z"
        },
        "averageRating": {
            "productId": "j3m2n7o0-l6k9-4m45-gbjb-a0l2m3n4o5p6r",
            "avgRating": 4.3,
            "totalRating": 410
        }
    },
    {
        "id": "k4n3o8p1-m7l0-4n56-hckc-b1m3n4o5p6r7s",
        "productName": "New Balance Accessories Model 51",
        "price": 70,
        "description": "Essential accessory from New Balance.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:15:08Z",
        "updatedAt": "2024-10-30T04:15:08Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:15:08Z",
            "updatedAt": "2024-10-30T04:15:08Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:15:08Z",
            "updatedAt": "2024-10-30T04:15:08Z"
        },
        "averageRating": {
            "productId": "k4n3o8p1-m7l0-4n56-hckc-b1m3n4o5p6r7s",
            "avgRating": 4.1,
            "totalRating": 290
        }
    },
    {
        "id": "l5o4p9q2-n8m1-4o67-idl-c2n4o5p6r7s8t",
        "productName": "Puma Hoodie Model 52",
        "price": 210,
        "description": "Comfortable Puma pull-over hoodie.",
        "brandId": "uuid-brand-puma",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:15:13Z",
        "updatedAt": "2024-10-30T04:15:13Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-puma",
            "brandName": "Puma",
            "createdAt": "2024-10-30T04:15:13Z",
            "updatedAt": "2024-10-30T04:15:13Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:15:13Z",
            "updatedAt": "2024-10-30T04:15:13Z"
        },
        "averageRating": {
            "productId": "l5o4p9q2-n8m1-4o67-idl-c2n4o5p6r7s8t",
            "avgRating": 4.2,
            "totalRating": 360
        }
    },
    {
        "id": "m6p5q0r3-o9n2-4p78-jem-d3o5p6r7s8t9u",
        "productName": "Nike Shoes Model 53",
        "price": 250,
        "description": "High-performance Nike sneakers.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:15:18Z",
        "updatedAt": "2024-10-30T04:15:18Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:15:18Z",
            "updatedAt": "2024-10-30T04:15:18Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:15:18Z",
            "updatedAt": "2024-10-30T04:15:18Z"
        },
        "averageRating": {
            "productId": "m6p5q0r3-o9n2-4p78-jem-d3o5p6r7s8t9u",
            "avgRating": 4.7,
            "totalRating": 550
        }
    },
    {
        "id": "n7q6r1s4-p0o3-4q89-kfn-e4p6r7s8t9u0v",
        "productName": "Adidas T-Shirt Model 54",
        "price": 90,
        "description": "Soft cotton Adidas t-shirt.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:15:23Z",
        "updatedAt": "2024-10-30T04:15:23Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:15:23Z",
            "updatedAt": "2024-10-30T04:15:23Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:15:23Z",
            "updatedAt": "2024-10-30T04:15:23Z"
        },
        "averageRating": {
            "productId": "n7q6r1s4-p0o3-4q89-kfn-e4p6r7s8t9u0v",
            "avgRating": 4.3,
            "totalRating": 220
        }
    },
    {
        "id": "o8r7s2t5-q1p4-4r90-lgo-f5q7s8t9u0v1w",
        "productName": "Converse Pants Model 55",
        "price": 135,
        "description": "Durable and comfortable Converse pants.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:15:28Z",
        "updatedAt": "2024-10-30T04:15:28Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:15:28Z",
            "updatedAt": "2024-10-30T04:15:28Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:15:28Z",
            "updatedAt": "2024-10-30T04:15:28Z"
        },
        "averageRating": {
            "productId": "o8r7s2t5-q1p4-4r90-lgo-f5q7s8t9u0v1w",
            "avgRating": 4.0,
            "totalRating": 190
        }
    },
    {
        "id": "p9s8t3u6-r2q5-4s01-mph-g6r8t9u0v1w2x",
        "productName": "Vans Accessories Model 56",
        "price": 60,
        "description": "Practical Vans accessory item.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:15:33Z",
        "updatedAt": "2024-10-30T04:15:33Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:15:33Z",
            "updatedAt": "2024-10-30T04:15:33Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:15:33Z",
            "updatedAt": "2024-10-30T04:15:33Z"
        },
        "averageRating": {
            "productId": "p9s8t3u6-r2q5-4s01-mph-g6r8t9u0v1w2x",
            "avgRating": 4.5,
            "totalRating": 85
        }
    },
    {
        "id": "q0t9u4v7-s3r6-4t12-nqi-h7s9u0v1w2x3y",
        "productName": "New Balance Hoodie Model 57",
        "price": 155,
        "description": "Warm and stylish New Balance hoodie.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:15:38Z",
        "updatedAt": "2024-10-30T04:15:38Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:15:38Z",
            "updatedAt": "2024-10-30T04:15:38Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:15:38Z",
            "updatedAt": "2024-10-30T04:15:38Z"
        },
        "averageRating": {
            "productId": "q0t9u4v7-s3r6-4t12-nqi-h7s9u0v1w2x3y",
            "avgRating": 4.1,
            "totalRating": 340
        }
    },
    {
        "id": "r1u0v5w8-t4s7-4u23-orj-i8t0v1w2x3y4z",
        "productName": "Puma Pants Model 58",
        "price": 180,
        "description": "Flexible and durable Puma sports pants.",
        "brandId": "uuid-brand-puma",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:15:43Z",
        "updatedAt": "2024-10-30T04:15:43Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-puma",
            "brandName": "Puma",
            "createdAt": "2024-10-30T04:15:43Z",
            "updatedAt": "2024-10-30T04:15:43Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:15:43Z",
            "updatedAt": "2024-10-30T04:15:43Z"
        },
        "averageRating": {
            "productId": "r1u0v5w8-t4s7-4u23-orj-i8t0v1w2x3y4z",
            "avgRating": 4.4,
            "totalRating": 210
        }
    },
    {
        "id": "s2v1w6x9-u5t8-4v34-psk-j9u1w2x3y4z5a",
        "productName": "Nike Accessories Model 59",
        "price": 40,
        "description": "Nike accessory for active lifestyle.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:15:48Z",
        "updatedAt": "2024-10-30T04:15:48Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:15:48Z",
            "updatedAt": "2024-10-30T04:15:48Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:15:48Z",
            "updatedAt": "2024-10-30T04:15:48Z"
        },
        "averageRating": {
            "productId": "s2v1w6x9-u5t8-4v34-psk-j9u1w2x3y4z5a",
            "avgRating": 3.8,
            "totalRating": 120
        }
    },
    {
        "id": "t3w2x7y0-v6u9-4w45-qtl-k0v2x3y4z5a6b",
        "productName": "Adidas Shoes Model 60",
        "price": 280,
        "description": "High-end Adidas athletic shoes.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:15:53Z",
        "updatedAt": "2024-10-30T04:15:53Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:15:53Z",
            "updatedAt": "2024-10-30T04:15:53Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:15:53Z",
            "updatedAt": "2024-10-30T04:15:53Z"
        },
        "averageRating": {
            "productId": "t3w2x7y0-v6u9-4w45-qtl-k0v2x3y4z5a6b",
            "avgRating": 4.9,
            "totalRating": 390
        }
    },
    {
        "id": "u4x3y8z1-w7v0-4x56-rum-l1w3y4z5a6b7c",
        "productName": "Converse Hoodie Model 61",
        "price": 160,
        "description": "Classic Converse hoodie design.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:15:58Z",
        "updatedAt": "2024-10-30T04:15:58Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:15:58Z",
            "updatedAt": "2024-10-30T04:15:58Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:15:58Z",
            "updatedAt": "2024-10-30T04:15:58Z"
        },
        "averageRating": {
            "productId": "u4x3y8z1-w7v0-4x56-rum-l1w3y4z5a6b7c",
            "avgRating": 4.6,
            "totalRating": 245
        }
    },
    {
        "id": "v5y4z9a2-x8w1-4y67-svn-m2x4z5a6b7c8d",
        "productName": "Vans Pants Model 62",
        "price": 110,
        "description": "Comfortable casual pants from Vans.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:16:03Z",
        "updatedAt": "2024-10-30T04:16:03Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:16:03Z",
            "updatedAt": "2024-10-30T04:16:03Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:16:03Z",
            "updatedAt": "2024-10-30T04:16:03Z"
        },
        "averageRating": {
            "productId": "v5y4z9a2-x8w1-4y67-svn-m2x4z5a6b7c8d",
            "avgRating": 4.2,
            "totalRating": 175
        }
    },
    {
        "id": "w6z5a0b3-y9x2-4z78-two-n3y5a6b7c8d9e",
        "productName": "New Balance T-Shirt Model 63",
        "price": 95,
        "description": "New Balance t-shirt with great fit.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:16:08Z",
        "updatedAt": "2024-10-30T04:16:08Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:16:08Z",
            "updatedAt": "2024-10-30T04:16:08Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:16:08Z",
            "updatedAt": "2024-10-30T04:16:08Z"
        },
        "averageRating": {
            "productId": "w6z5a0b3-y9x2-4z78-two-n3y5a6b7c8d9e",
            "avgRating": 4.4,
            "totalRating": 305
        }
    },
    {
        "id": "x7a6b1c4-z0y3-4a89-upx-o4z6b7c8d9e0f",
        "productName": "Puma Shoes Model 64",
        "price": 240,
        "description": "Sporty Puma shoes for training.",
        "brandId": "uuid-brand-puma",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:16:13Z",
        "updatedAt": "2024-10-30T04:16:13Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-puma",
            "brandName": "Puma",
            "createdAt": "2024-10-30T04:16:13Z",
            "updatedAt": "2024-10-30T04:16:13Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:16:13Z",
            "updatedAt": "2024-10-30T04:16:13Z"
        },
        "averageRating": {
            "productId": "x7a6b1c4-z0y3-4a89-upx-o4z6b7c8d9e0f",
            "avgRating": 4.5,
            "totalRating": 450
        }
    },
    {
        "id": "y8b7c2d5-a1z4-4b90-vqy-p5a7c8d9e0f1g",
        "productName": "Nike Hoodie Model 65",
        "price": 190,
        "description": "Essential Nike hoodie, great for layering.",
        "brandId": "uuid-brand-nike",
        "categoryId": "uuid-category-hoodie",
        "createdAt": "2024-10-30T04:16:18Z",
        "updatedAt": "2024-10-30T04:16:18Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-nike",
            "brandName": "Nike",
            "createdAt": "2024-10-30T04:16:18Z",
            "updatedAt": "2024-10-30T04:16:18Z"
        },
        "category": {
            "id": "uuid-category-hoodie",
            "categoryName": "Hoodie",
            "createdAt": "2024-10-30T04:16:18Z",
            "updatedAt": "2024-10-30T04:16:18Z"
        },
        "averageRating": {
            "productId": "y8b7c2d5-a1z4-4b90-vqy-p5a7c8d9e0f1g",
            "avgRating": 4.1,
            "totalRating": 370
        }
    },
    {
        "id": "z9c8d3e6-b2a5-4c01-wrz-q6b8d9e0f1g2h",
        "productName": "Adidas Pants Model 66",
        "price": 140,
        "description": "Comfortable Adidas joggers for everyday wear.",
        "brandId": "uuid-brand-adidas",
        "categoryId": "uuid-category-pants",
        "createdAt": "2024-10-30T04:16:23Z",
        "updatedAt": "2024-10-30T04:16:23Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-adidas",
            "brandName": "Adidas",
            "createdAt": "2024-10-30T04:16:23Z",
            "updatedAt": "2024-10-30T04:16:23Z"
        },
        "category": {
            "id": "uuid-category-pants",
            "categoryName": "Pants",
            "createdAt": "2024-10-30T04:16:23Z",
            "updatedAt": "2024-10-30T04:16:23Z"
        },
        "averageRating": {
            "productId": "z9c8d3e6-b2a5-4c01-wrz-q6b8d9e0f1g2h",
            "avgRating": 4.3,
            "totalRating": 260
        }
    },
    {
        "id": "a0d9e4f7-c3b6-4d12-xsa-r7c9e0f1g2h3i",
        "productName": "Converse Accessories Model 67",
        "price": 50,
        "description": "Essential small Converse accessory.",
        "brandId": "uuid-brand-converse",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:16:28Z",
        "updatedAt": "2024-10-30T04:16:28Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-converse",
            "brandName": "Converse",
            "createdAt": "2024-10-30T04:16:28Z",
            "updatedAt": "2024-10-30T04:16:28Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:16:28Z",
            "updatedAt": "2024-10-30T04:16:28Z"
        },
        "averageRating": {
            "productId": "a0d9e4f7-c3b6-4d12-xsa-r7c9e0f1g2h3i",
            "avgRating": 4.1,
            "totalRating": 105
        }
    },
    {
        "id": "b1e0f5g8-d4c7-4e23-ytb-s8d0f1g2h3i4j",
        "productName": "Vans T-Shirt Model 68",
        "price": 105,
        "description": "Soft and classic Vans t-shirt.",
        "brandId": "uuid-brand-vans",
        "categoryId": "uuid-category-tshirt",
        "createdAt": "2024-10-30T04:16:33Z",
        "updatedAt": "2024-10-30T04:16:33Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-vans",
            "brandName": "Vans",
            "createdAt": "2024-10-30T04:16:33Z",
            "updatedAt": "2024-10-30T04:16:33Z"
        },
        "category": {
            "id": "uuid-category-tshirt",
            "categoryName": "T-Shirt",
            "createdAt": "2024-10-30T04:16:33Z",
            "updatedAt": "2024-10-30T04:16:33Z"
        },
        "averageRating": {
            "productId": "b1e0f5g8-d4c7-4e23-ytb-s8d0f1g2h3i4j",
            "avgRating": 4.4,
            "totalRating": 295
        }
    },
    {
        "id": "c2f1g6h9-e5d8-4f34-zuc-t9e1g2h3i4j5k",
        "productName": "New Balance Shoes Model 69",
        "price": 170,
        "description": "Casual everyday shoes from New Balance.",
        "brandId": "uuid-brand-newbalance",
        "categoryId": "uuid-category-shoes",
        "createdAt": "2024-10-30T04:16:38Z",
        "updatedAt": "2024-10-30T04:16:38Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-newbalance",
            "brandName": "New Balance",
            "createdAt": "2024-10-30T04:16:38Z",
            "updatedAt": "2024-10-30T04:16:38Z"
        },
        "category": {
            "id": "uuid-category-shoes",
            "categoryName": "Shoes",
            "createdAt": "2024-10-30T04:16:38Z",
            "updatedAt": "2024-10-30T04:16:38Z"
        },
        "averageRating": {
            "productId": "c2f1g6h9-e5d8-4f34-zuc-t9e1g2h3i4j5k",
            "avgRating": 4.0,
            "totalRating": 325
        }
    },
    {
        "id": "d3g2h7i0-f6e9-4g45-avd-u0f2h3i4j5k6l",
        "productName": "Puma Accessories Model 70",
        "price": 80,
        "description": "Functional Puma sports accessory.",
        "brandId": "uuid-brand-puma",
        "categoryId": "uuid-category-accessories",
        "createdAt": "2024-10-30T04:16:43Z",
        "updatedAt": "2024-10-30T04:16:43Z",
        "images": "/logo.png",
        "brand": {
            "id": "uuid-brand-puma",
            "brandName": "Puma",
            "createdAt": "2024-10-30T04:16:43Z",
            "updatedAt": "2024-10-30T04:16:43Z"
        },
        "category": {
            "id": "uuid-category-accessories",
            "categoryName": "Accessories",
            "createdAt": "2024-10-30T04:16:43Z",
            "updatedAt": "2024-10-30T04:16:43Z"
        },
        "averageRating": {
            "productId": "d3g2h7i0-f6e9-4g45-avd-u0f2h3i4j5k6l",
            "avgRating": 4.2,
            "totalRating": 140
        }
    }
]
export default mockProduct;
