export async function seedDatabase() {
  //   await db.insert(schema.users).values([
  //     {
  //       name: 'Ali Valiyev',
  //       email: 'ali@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Olim Karimov',
  //       email: 'olim@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Zebo Rahimova',
  //       email: 'zebo@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Jasur Saidov',
  //       email: 'jasur@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Malika Yusupova',
  //       email: 'malika@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Shoxrux Mirzo',
  //       email: 'shoxrux@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Laylo Oripova',
  //       email: 'laylo@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Rustam Eshonov',
  //       email: 'rustam@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Dilnoza Kamolova',
  //       email: 'dilnoza@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //     {
  //       name: 'Sherzod Akromov',
  //       email: 'sherzod@example.com',
  //       image: 'https://via.placeholder.com/150',
  //     },
  //   ]);

  //   const categories = [
  //     { name: 'Elektronika', description: 'Qurilmalar va gadjetlar' },
  //     { name: 'Kitoblar', description: 'Turli janrdagi kitoblar' },
  //     { name: 'Kiyim-kechak', description: 'Moda va aksessuarlar' },
  //     {
  //       name: 'O‘yinchoqlar',
  //       description: 'Bolalar va kattalar uchun o‘yinchoqlar',
  //     },
  //     { name: 'Mebel', description: 'Uy va ofis mebellari' },
  //     { name: 'Sport', description: 'Sport anjomlari va jihozlari' },
  //     {
  //       name: 'Go‘zallik',
  //       description: 'Kosmetika va terini parvarish qilish vositalari',
  //     },
  //     {
  //       name: 'Avtomobil',
  //       description: 'Avtomobil aksessuarlari va ehtiyot qismlari',
  //     },
  //     {
  //       name: 'Zargarlik buyumlari',
  //       description: 'Uzuk, taqinchoqlar va boshqalar',
  //     },
  //     { name: 'Oziq-ovqat', description: 'Oziq-ovqat mahsulotlari' },
  //   ];

  //   await db.insert(schema.categories).values(categories);

  //   await db.insert(schema.products).values([
  //     ...Array.from({ length: 20 }, (_, i) => ({
  //       name: `Mahsulot ${i + 1}`,
  //       description: `Mahsulot ${i + 1} uchun tavsif`,
  //       price: (Math.random() * 100).toFixed(2),
  //       stock: Math.floor(Math.random() * 50) + 1,
  //       categoryId: (i % 10) + 1,
  //     })),
  //   ]);

  //   const banners = [
  //     {
  //       title: 'Qishki chegirmalar',
  //       imageUrl: 'https://via.placeholder.com/500',
  //       isActive: true,
  //     },
  //     {
  //       title: 'Yozgi aksiya',
  //       imageUrl: 'https://via.placeholder.com/500',
  //       isActive: true,
  //     },
  //     {
  //       title: 'Yangi kelgan mahsulotlar',
  //       imageUrl: 'https://via.placeholder.com/500',
  //       isActive: true,
  //     },
  //     {
  //       title: 'Maxsus takliflar',
  //       imageUrl: 'https://via.placeholder.com/500',
  //       isActive: true,
  //     },
  //     {
  //       title: 'Chegirmalar haftaligi',
  //       imageUrl: 'https://via.placeholder.com/500',
  //       isActive: true,
  //     },
  //   ];

  //   await db.insert(schema.banners).values(banners);

  //   await db.insert(schema.orders).values([
  //     ...Array.from({ length: 10 }, (_, i) => ({
  //       userId: (i % 10) + 247,
  //       totalAmount: (Math.random() * 500).toFixed(2),
  //       status: ['kutish', 'yetkazildi', 'bajarildi'][
  //         Math.floor(Math.random() * 3)
  //       ],
  //     })),
  //   ]);

  const products = [
    {
      name: 'Smartfon',
      description: 'Eng yangi modeldagi smartfon',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '799.99',
      stock: 20,
      categoryId: 1,
    },
    {
      name: 'Noutbuk',
      description: 'Ish va o‘yin uchun qulay noutbuk',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '1299.99',
      stock: 15,
      categoryId: 1,
    },
    {
      name: 'Televizor',
      description: 'Ultra HD smart televizor',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '999.99',
      stock: 10,
      categoryId: 1,
    },
    {
      name: 'Roman kitobi',
      description: 'Mashhur yozuvchidan yangi roman',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '19.99',
      stock: 50,
      categoryId: 2,
    },
    {
      name: 'Ilmiy kitob',
      description: 'Ilmiy tadqiqotlar haqida kitob',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '29.99',
      stock: 30,
      categoryId: 2,
    },
    {
      name: 'Kurtka',
      description: 'Qishki issiq kurtka',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '89.99',
      stock: 25,
      categoryId: 3,
    },
    {
      name: 'Ko‘ylak',
      description: 'Klassik erkaklar ko‘ylagi',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '49.99',
      stock: 40,
      categoryId: 3,
    },
    {
      name: 'Lego to‘plami',
      description: 'Bolalar uchun kreativ Lego',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '59.99',
      stock: 20,
      categoryId: 4,
    },
    {
      name: 'Bolalar o‘yinchoqlari',
      description: 'Turli yoshdagilar uchun o‘yinchoqlar',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '39.99',
      stock: 35,
      categoryId: 4,
    },
    {
      name: 'Stol',
      description: 'Yog‘ochdan yasalgan klassik stol',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '199.99',
      stock: 10,
      categoryId: 5,
    },
    {
      name: 'Ofis kreslosi',
      description: 'Ortopedik ofis kreslosi',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '149.99',
      stock: 15,
      categoryId: 5,
    },
    {
      name: 'Velosiped',
      description: 'Sport uchun tog‘ velosipedi',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '299.99',
      stock: 12,
      categoryId: 6,
    },
    {
      name: 'Futbol to‘pi',
      description: 'Professional futbol to‘pi',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '34.99',
      stock: 40,
      categoryId: 6,
    },
    {
      name: 'Parfyum',
      description: 'Xushbo‘y atir',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '59.99',
      stock: 30,
      categoryId: 7,
    },
    {
      name: 'Tonal krem',
      description: 'Yuqori sifatli tonal krem',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '24.99',
      stock: 35,
      categoryId: 7,
    },
    {
      name: 'Avtomobil navigatori',
      description: 'Yo‘l harakati uchun GPS navigator',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '129.99',
      stock: 10,
      categoryId: 8,
    },
    {
      name: 'Shinalar to‘plami',
      description: 'Qishki shinalar to‘plami',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '399.99',
      stock: 8,
      categoryId: 8,
    },
    {
      name: 'Brilliant uzuk',
      description: 'Zargarlik buyumlari to‘plami',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '999.99',
      stock: 5,
      categoryId: 9,
    },
    {
      name: 'Oziq-ovqat savatchasi',
      description: 'Har xil mahsulotlardan iborat savatcha',
      imageUrl: 'https://fastly.picsum.photos/id/866/400/600.jpg',
      price: '49.99',
      stock: 20,
      categoryId: 10,
    },
  ];

  //   await db.insert(schema.products).values(products);
  //   await db.insert(schema.orderItems).values([
  //     ...Array.from({ length: 10 }, (_, i) => ({
  //       orderId: (i % 10) + 11,
  //       productId: (i % 19) + 41,
  //       quantity: Math.floor(Math.random() * 5) + 1,
  //       price: (Math.random() * 10000).toFixed(2),
  //     })),
  //   ]);

  console.log('Ma‘lumotlar bazasiga muvaffaqiyatli yuklandi');
}
