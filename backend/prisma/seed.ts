import { PrismaClient, Role, CouponType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('👑 Seeding Jaypurloom Enterprise Database...');

  // 1. Clean existing data
  await prisma.notification.deleteMany();
  await prisma.walletTransaction.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.returnRequest.deleteMany();
  await prisma.order.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users (Admin & Customer)
  const adminPassword = await bcrypt.hash('Admin@12345', 10);
  const customerPassword = await bcrypt.hash('Customer@123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@jaypurloom.com',
      phone: '9876543210',
      password: adminPassword,
      name: 'Jaypurloom Admin',
      role: Role.ADMIN,
      isVerified: true,
      walletBalance: 10000.0,
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'rohan@jaypurloom.com',
      phone: '9123456789',
      password: customerPassword,
      name: 'Rohan Sharma',
      role: Role.CUSTOMER,
      isVerified: true,
      walletBalance: 750.0,
      addresses: {
        create: [
          {
            street: 'Flat 402, Royal Heritage Apartments, C-Scheme',
            city: 'Jaipur',
            state: 'Rajasthan',
            postalCode: '302001',
            country: 'India',
            phone: '9123456789',
            isDefault: true,
          },
        ],
      },
    },
  });

  console.log(`✅ Created users: ${admin.email} and ${customer.email}`);

  // 3. Create Categories & Subcategories
  const womenCat = await prisma.category.create({
    data: {
      name: 'Women',
      slug: 'women',
      description: "Explore Jaypurloom's regal collection of handcrafted women's ethnic wear.",
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop',
    },
  });

  const suitSetsCat = await prisma.category.create({
    data: {
      name: 'Suit Sets',
      slug: 'suit-sets',
      description: 'Hand-block printed cotton and silk ladies suit sets.',
      parentId: womenCat.id,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop',
    },
  });

  const anarkaliCat = await prisma.category.create({
    data: {
      name: 'Anarkali Suits',
      slug: 'anarkali-suits',
      description: 'Flowing, royal Anarkali suit sets with intricate gota patti embroidery.',
      parentId: womenCat.id,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop',
    },
  });

  const kurtaSetsCat = await prisma.category.create({
    data: {
      name: 'Kurta Sets',
      slug: 'kurta-sets',
      description: 'Everyday elegance in pure Jaipur cotton kurta sets.',
      parentId: womenCat.id,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop',
    },
  });

  const dupattasCat = await prisma.category.create({
    data: {
      name: 'Dupattas',
      slug: 'dupattas',
      description: 'Chanderi silk, organza, and kota doria luxury dupattas.',
      parentId: womenCat.id,
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop',
    },
  });

  const bedsheetsCat = await prisma.category.create({
    data: {
      name: 'Bedsheets',
      slug: 'bedsheets',
      description: 'Transform your bedroom with authentic Jaipuri block-print cotton bedsheets.',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop',
    },
  });

  const kingSizeCat = await prisma.category.create({
    data: {
      name: 'King Size Bedsheets',
      slug: 'king-size-bedsheets',
      description: '108x108 inch pure breathable cotton bedsheets with pillow covers.',
      parentId: bedsheetsCat.id,
      image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&auto=format&fit=crop',
    },
  });

  const collectionsCat = await prisma.category.create({
    data: {
      name: 'Collections',
      slug: 'collections',
      description: 'Curated seasonal and festive collections.',
    },
  });

  const festiveCat = await prisma.category.create({
    data: {
      name: 'Festive Collection',
      slug: 'festive-collection',
      description: 'Opulent gold foil and zari work ensembles designed for Indian festivities.',
      parentId: collectionsCat.id,
    },
  });

  console.log(`✅ Created hierarchical category tree.`);

  // 4. Create Luxury Products & Variants
  const productsData = [
    {
      title: 'Royal Maroon Zari Gota Patti Anarkali Suit Set',
      slug: 'royal-maroon-zari-gota-patti-anarkali-suit-set',
      description: 'Step into royal grandeur with our signature Jaypurloom Royal Maroon Anarkali Suit Set. Crafted from premium Chanderi silk with authentic Rajasthani gota patti hand embroidery on the yoke and flares. Comes with matching tailored trousers and a scalloped gold-bordered organza dupatta.',
      fabric: 'Chanderi Silk & Pure Cotton Lining',
      washCare: 'Dry Clean Only. Iron inside out on low heat.',
      specifications: JSON.stringify({
        'Sleeve Length': 'Three-Quarter Sleeves',
        'Neckline': 'Royal V-Neck with Gota Detailing',
        'Dupatta Fabric': 'Pure Scalloped Organza',
        'Origin': 'Handcrafted in Jaipur, Rajasthan',
        'Occasion': 'Wedding, Reception & Festive Wear'
      }),
      isBestSeller: true,
      isNewArrival: true,
      gstRate: 12.0,
      categoryId: anarkaliCat.id,
      tags: 'anarkali,maroon,gold,wedding,festive,silk',
      images: [
        { url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&auto=format&fit=crop', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop', isPrimary: false },
        { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop', isPrimary: false }
      ],
      variants: [
        { sku: 'JPL-ANR-MAR-S', color: 'Royal Maroon', colorHex: '#6B1D2F', size: 'S', mrp: 6999, price: 4499, stock: 12 },
        { sku: 'JPL-ANR-MAR-M', color: 'Royal Maroon', colorHex: '#6B1D2F', size: 'M', mrp: 6999, price: 4499, stock: 18 },
        { sku: 'JPL-ANR-MAR-L', color: 'Royal Maroon', colorHex: '#6B1D2F', size: 'L', mrp: 6999, price: 4499, stock: 15 },
        { sku: 'JPL-ANR-MAR-XL', color: 'Royal Maroon', colorHex: '#6B1D2F', size: 'XL', mrp: 6999, price: 4499, stock: 4 } // Low stock
      ]
    },
    {
      title: 'Ivory & Gold Mughal Block Print Cotton Suit Set',
      slug: 'ivory-gold-mughal-block-print-cotton-suit-set',
      description: 'Experience summer luxury with our Ivory & Gold Mughal floral hand-block print suit set. Woven from 60x60 breathable Jaipur cotton, embellished with subtle antique gold zari accents along the neckline and cuffs. Paired with block-print palazzo pants and a feather-light kota doria dupatta.',
      fabric: '100% Pure 60x60 Jaipur Cotton',
      washCare: 'Gentle hand wash separately in cold water with mild detergent.',
      specifications: JSON.stringify({
        'Sleeve Length': 'Full Sleeves with Folded Cuff',
        'Neckline': 'Round Neck with Keyhole Button',
        'Dupatta Fabric': 'Kota Doria with Zari Border',
        'Origin': 'Handcrafted in Jaipur, Rajasthan',
        'Occasion': 'Office Wear & Day Celebrations'
      }),
      isBestSeller: true,
      isNewArrival: false,
      gstRate: 12.0,
      categoryId: suitSetsCat.id,
      tags: 'cotton,ivory,gold,block print,office,summer',
      images: [
        { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop', isPrimary: false }
      ],
      variants: [
        { sku: 'JPL-SUT-IVR-S', color: 'Ivory & Gold', colorHex: '#F4F0E8', size: 'S', mrp: 4599, price: 2899, stock: 20 },
        { sku: 'JPL-SUT-IVR-M', color: 'Ivory & Gold', colorHex: '#F4F0E8', size: 'M', mrp: 4599, price: 2899, stock: 25 },
        { sku: 'JPL-SUT-IVR-L', color: 'Ivory & Gold', colorHex: '#F4F0E8', size: 'L', mrp: 4599, price: 2899, stock: 10 }
      ]
    },
    {
      title: 'Emerald Green Silk Blend Straight Kurta with Dupatta',
      slug: 'emerald-green-silk-blend-straight-kurta-set',
      description: 'Radiate timeless grace in our vibrant Emerald Green straight kurta set. Features delicate mirror work hand-embroidered by Rajasthani artisans across the placket and motifs.',
      fabric: 'Chanderi Silk Blend',
      washCare: 'Dry Clean Recommended.',
      specifications: JSON.stringify({
        'Sleeve Length': '3/4 Sleeves',
        'Neckline': 'Mandarin Collar',
        'Dupatta Fabric': 'Chiffon with Gold Lace',
        'Occasion': 'Festive & Evening Wear'
      }),
      isBestSeller: false,
      isNewArrival: true,
      gstRate: 12.0,
      categoryId: kurtaSetsCat.id,
      tags: 'emerald,green,silk,kurta,festive',
      images: [
        { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop', isPrimary: true }
      ],
      variants: [
        { sku: 'JPL-KRT-GRN-M', color: 'Emerald Green', colorHex: '#0E4D31', size: 'M', mrp: 3999, price: 2499, stock: 15 },
        { sku: 'JPL-KRT-GRN-L', color: 'Emerald Green', colorHex: '#0E4D31', size: 'L', mrp: 3999, price: 2499, stock: 8 }
      ]
    },
    {
      title: 'Heritage Indigo Bagru Print King Size Pure Cotton Bedsheet',
      slug: 'heritage-indigo-bagru-print-king-size-cotton-bedsheet',
      description: 'Transform your bedroom sanctuary with this authentic 108x108 inch King Size bedsheet handcrafted using traditional Bagru mud-resist block printing in natural indigo and earth tones. Comes with 2 matching reversible pillow covers.',
      fabric: '100% Super Combed 300 TC Cotton',
      washCare: 'Machine wash in cold gentle cycle. Do not bleach. Dry in shade.',
      specifications: JSON.stringify({
        'Thread Count': '300 TC Premium Weave',
        'Dimensions': '108 x 108 Inches (Super King)',
        'Pillow Covers': '2 Included (18 x 28 Inches)',
        'Dye Type': 'Natural Botanical Indigo Dyes',
        'Origin': 'Bagru, Rajasthan'
      }),
      isBestSeller: true,
      isNewArrival: false,
      gstRate: 18.0,
      categoryId: kingSizeCat.id,
      tags: 'bedsheet,king size,cotton,indigo,block print,home',
      images: [
        { url: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&auto=format&fit=crop', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&auto=format&fit=crop', isPrimary: false }
      ],
      variants: [
        { sku: 'JPL-BED-IND-KING', color: 'Indigo Blue', colorHex: '#1B365D', size: 'King Size (108x108)', mrp: 3499, price: 1999, stock: 30 }
      ]
    },
    {
      title: 'Royal Saffron & Gold Floral Jaipuri Bedsheet Set',
      slug: 'royal-saffron-gold-floral-jaipuri-bedsheet-set',
      description: 'Bring the warmth and luxury of royal Rajasthan hotels into your home with our Saffron and Gold botanical lattice print bedsheet.',
      fabric: '100% Pure Percale Cotton (350 TC)',
      washCare: 'Machine wash cold.',
      specifications: JSON.stringify({
        'Thread Count': '350 TC Ultra Soft',
        'Dimensions': '100 x 108 Inches (King)',
        'Pillow Covers': '2 Included with Envelope Closure'
      }),
      isBestSeller: false,
      isNewArrival: true,
      gstRate: 18.0,
      categoryId: kingSizeCat.id,
      tags: 'bedsheet,saffron,gold,king size,luxury',
      images: [
        { url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&auto=format&fit=crop', isPrimary: true }
      ],
      variants: [
        { sku: 'JPL-BED-SAF-KING', color: 'Saffron Gold', colorHex: '#D4AF37', size: 'King Size', mrp: 3999, price: 2299, stock: 18 }
      ]
    }
  ];

  for (const item of productsData) {
    const { variants, images, ...prodData } = item;
    await prisma.product.create({
      data: {
        ...prodData,
        variants: {
          create: variants
        },
        images: {
          create: images
        }
      }
    });
  }

  console.log(`✅ Seeded ${productsData.length} luxury products with variants and images.`);

  // 5. Create Sample Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'WELCOME10',
        type: CouponType.PERCENTAGE,
        value: 10.0,
        minOrderAmount: 1000.0,
        maxDiscount: 500.0,
        expiryDate: new Date('2027-12-31')
      },
      {
        code: 'FESTIVE20',
        type: CouponType.PERCENTAGE,
        value: 20.0,
        minOrderAmount: 2500.0,
        maxDiscount: 1500.0,
        expiryDate: new Date('2027-12-31')
      },
      {
        code: 'ROYAL15',
        type: CouponType.PERCENTAGE,
        value: 15.0,
        minOrderAmount: 1500.0,
        maxDiscount: 1000.0,
        expiryDate: new Date('2027-12-31')
      }
    ]
  });

  console.log(`✅ Seeded discount coupons: WELCOME10, FESTIVE20, ROYAL15`);

  // 6. Create Sample Reviews
  const maroonProd = await prisma.product.findUnique({ where: { slug: 'royal-maroon-zari-gota-patti-anarkali-suit-set' } });
  if (maroonProd) {
    await prisma.review.createMany({
      data: [
        {
          userId: customer.id,
          productId: maroonProd.id,
          rating: 5,
          title: 'Absolutely Stunning! True Royal Elegance',
          comment: 'I wore this Anarkali suit to my cousin’s wedding and received endless compliments! The Chanderi silk has a rich sheen and the gota patti work is authentic and neat. Worth every penny!',
          isVerifiedPurchase: true,
          isApproved: true
        },
        {
          userId: customer.id,
          productId: maroonProd.id,
          rating: 5,
          title: 'Premium quality fabric and fit',
          comment: 'The lining is super comfortable pure cotton, so even after 8 hours at the ceremony I felt totally relaxed. The organza dupatta is breathtaking.',
          isVerifiedPurchase: true,
          isApproved: true
        }
      ]
    });
  }

  // 7. Create Sample Blog Post
  await prisma.blog.create({
    data: {
      title: 'The Royal Art of Jaipur Gota Patti & Hand-Block Printing',
      slug: 'royal-art-of-jaipur-gota-patti-hand-block-printing',
      category: 'Craft & Heritage',
      excerpt: 'Discover how master artisans in Bagru and Sanganer preserve centuries-old textile traditions to create Jaypurloom’s luxury ethnic wear.',
      content: 'For over four hundred years, the desert cities of Rajasthan have nurtured some of the world’s most exquisite textile crafts...',
      coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop',
      author: 'Aarav Rathore, Master Weaver'
    }
  });

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
