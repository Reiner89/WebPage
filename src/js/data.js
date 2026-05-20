export const products = [
  {
    id: 1,
    name: "Classic Leather Briefcase",
    price: 399,
    category: "Bags",
    color: "Tan Brown",
    colors: ["Tan Brown", "Black", "Camel"],
    size: "Medium",
    material: "Full-grain leather",
    gender: "Unisex",
    model: "XYZ123",
    dimensions: "40cm x 30cm x 10cm",
    stock: 12,
    isNew: true,
    description:
      "Crafted from premium full-grain Peruvian leather, this classic briefcase combines timeless elegance with modern functionality. Perfect for daily commutes, work meetings and business travel.",
  },
  {
    id: 2,
    name: "Oxford Leather Wallet",
    price: 149,
    category: "Wallets",
    color: "Brown",
    colors: ["Brown", "Black", "Camel"],
    size: "Small",
    material: "Full-grain leather",
    gender: "Men",
    model: "WL-204",
    dimensions: "11cm x 9cm x 2cm",
    stock: 20,
    isNew: true,
    description:
      "Compact wallet with refined stitching and multiple card slots for everyday use.",
  },
  {
    id: 3,
    name: "Classic Tote Bag",
    price: 450,
    category: "Bags",
    color: "Black",
    colors: ["Black", "Tan Brown"],
    size: "Large",
    material: "Premium leather",
    gender: "Women",
    model: "TB-302",
    dimensions: "42cm x 34cm x 12cm",
    stock: 8,
    isNew: true,
    description:
      "A spacious tote with a minimalist silhouette and durable premium leather finish.",
  },
  {
    id: 4,
    name: "Vintage Messenger",
    price: 380,
    category: "Messenger Bags",
    color: "Tan Brown",
    colors: ["Tan Brown", "Camel"],
    size: "Medium",
    material: "Full-grain leather",
    gender: "Unisex",
    model: "MS-510",
    dimensions: "38cm x 28cm x 9cm",
    stock: 15,
    isNew: true,
    description:
      "Vintage-inspired messenger bag made for comfort, durability and daily style.",
  },
  {
    id: 5,
    name: "Leather Cardholder",
    price: 85,
    category: "Accessories",
    color: "Camel",
    colors: ["Camel", "Brown", "Black"],
    size: "Small",
    material: "Premium leather",
    gender: "Unisex",
    model: "CH-118",
    dimensions: "10cm x 7cm x 1cm",
    stock: 30,
    isNew: true,
    description:
      "Slim leather cardholder for essential cards and quick access.",
  },
  ...Array.from({ length: 8 }, (_, index) => {
    const id = index + 6;
    const cats = ["Accessories", "Wallets", "Bags", "Messenger Bags"];
    const category = cats[index % cats.length];
    return {
      id,
      name: `Leather Product ${index + 1}`,
      price: 39.99 * (index + 1),
      category,
      color: ["Brown", "Black", "Camel", "Tan Brown"][index % 4],
      colors: ["Brown", "Black", "Camel", "Tan Brown"].slice(
        0,
        2 + (index % 3),
      ),
      size: ["Small", "Medium", "Large"][index % 3],
      material: ["Leather", "Premium leather", "Full-grain leather"][index % 3],
      gender: ["Unisex", "Men", "Women"][index % 3],
      model: `LP-00${index + 1}`,
      dimensions: "30cm x 20cm x 8cm",
      stock: 5 + index,
      isNew: false,
      description:
        "Functional leather accessory with a clean, timeless design and premium finish.",
    };
  }),
];

export const categories = [
  { name: "Billeteras", href: "#/shop?category=Wallets" },
  { name: "Bolsos", href: "#/shop?category=Bags" },
  { name: "Morrales", href: "#/shop?category=Messenger Bags" },
  { name: "Accesorios", href: "#/shop?category=Accessories" },
];
