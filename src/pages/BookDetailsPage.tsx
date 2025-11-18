import { fetchBookProduct, type BookProduct } from '@/lib/Mock Product Data';
import React, { useEffect, useState, useCallback } from 'react';
import { BookDetailsTemplate } from '../components/templates/BookDetailsTemplate';

const BOOK_NAMESPACE_ID = 'chip-war';

export const BookDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<BookProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('uk');
  const [isInWishlist, setIsInWishlist] = useState(false);

  const loadProductData = useCallback(async (lang: string) => {
    setLoading(true);
    try {
      const data = await fetchBookProduct(BOOK_NAMESPACE_ID, lang);
      if (data) {
        setProduct(data);
        setCurrentLanguage(lang);
      } else {
        console.error(`Product variant for language ${lang} not found.`);
        setProduct(null);
      }
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProductData(currentLanguage);
  }, [loadProductData, currentLanguage]);

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    console.log('Toggle Wishlist clicked!');
  };

  const handleAddToCart = () => {
    console.log('Add to Cart clicked!');
  };

  const handleLanguageChange = (lang: string) => {
    loadProductData(lang);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Завантаження деталей продукту...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        Помилка: Не вдалося завантажити дані продукту.
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Paper books', href: '/books' },
    { label: 'Tech/business', href: '/books/tech-business' },
  ];

  const templateData = {
    book: {
      title: product.title,
      author: product.author,
      images: product.images,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      details: product.details,
      aboutTitle: product.about[0] || 'About this book',
      aboutContent: product.about.slice(1),
      characteristics: product.details,
    },
    breadcrumbs,
    selectedLanguage: currentLanguage,
    onSelectLanguage: handleLanguageChange,
    onAddToCart: handleAddToCart,
    onToggleWishlist: handleToggleWishlist,
    isInWishlist,
    availableLanguages: product.availableLanguages,
  };

  return <BookDetailsTemplate {...templateData} />;
};

// import { Button } from '@/components/atoms/Button';
// import { Icon } from '../../src/components/atoms/Icon';
// import React from 'react';

// export const BookDetailsPage = () => {
//   return (
//     <div className="container pt-6">
//       {/* Breadcrumb */}
//       <div className="flex items-center gap-1 uppercase font-bold text-[14px] leading-[21px] tracking-[0.01em] truncate whitespace-nowrap">
//         <Icon name="home"></Icon>
//         <Icon name="arrowRight"></Icon>
//         <span className="block sm:hidden">...</span>
//         <span className="hidden sm:inline">Paper books</span>
//         <Icon name="arrowRight" className="hidden sm:inline"></Icon>
//         <span className="hidden sm:inline">Tech/business</span>
//         <Icon name="arrowRight"></Icon>
//         <span className="uppercase text-secondary truncate">
//           chip war. the fight for the world's most critical technology
//         </span>
//       </div>

//       {/* Title */}
//       <h2 className="mt-4 md:mt-6 tracking-[0] md:tracking-[-0.01em]">
//         Chip War. The Fight for the World’s Most Critical Technology
//       </h2>
//       <p className="mt-1.5 opacity-60">Chris Miller</p>

//       <div className="px-4 md:px-6 lg:px-8 mt-[5px] md:mt-8 lg:mt-10">
//         {/* GRID ONLY ON DESKTOP */}
//         <div className="sm:grid sm:grid-cols-[auto_1fr_1fr] flex flex-col items-center sm:flex-none sm:flex-row sm:items-start">
//           {/* DESKTOP/TABLET (VERTICAL) */}
//           <div className="hidden sm:flex flex-col gap-2 mr-6">
//             <img
//               src="/tempIMG/book-00.png"
//               className="w-16 h-16 lg:w-20 lg:h-20 rounded p-2 cursor-pointer border border-primary"
//             />
//             <img
//               src="/tempIMG/book-00.png"
//               className="w-16 h-16 lg:w-20 lg:h-20 rounded p-2 cursor-pointer border border-border "
//             />
//             <img
//               src="/tempIMG/book-00.png"
//               className="w-16 h-16 lg:w-20 lg:h-20 rounded p-2 cursor-pointer border border-border "
//             />
//             <img
//               src="/tempIMG/book-00.png"
//               className="w-16 h-16 lg:w-20 lg:h-20 rounded p-2 cursor-pointer border border-border "
//             />
//             <img
//               src="/tempIMG/book-00.png"
//               className="w-16 h-16 lg:w-20 lg:h-20 rounded p-2 cursor-pointer border border-border "
//             />
//             <img
//               src="/tempIMG/book-00.png"
//               className="w-16 h-16 lg:w-20 lg:h-20 rounded p-2 cursor-pointer border border-border "
//             />
//           </div>

//           {/* COLUMN 2 — MAIN IMAGE */}
//           <div className="flex justify-center lg:justify-start mr-8">
//             <img
//               src="../../public/tempIMG/Main.png"
//               alt="Book cover"
//               // hover:scale-150
//               className="  w-[205px] h-[278px] md:w-[205px] md:h-[316px] lg:w-[337px] lg:h-[520px] rounded-[10px]"
//             />
//           </div>

//           {/* COLUMN 1 MOBILE — HORIZONTAL SCROLL */}
//           <div className="w-full overflow-x-auto p-2 sm:hidden mt-[41px]">
//             <div className="flex justify-center gap-2">
//               <img
//                 src="../../public/tempIMG/book-00.png"
//                 className="w-16 h-16 p-2 cursor-pointer border rounded shrink-0 border-primary"
//               />
//               <img
//                 src="../../public/tempIMG/book-00.png"
//                 className="w-16 h-16 p-2 rounded border-border border cursor-pointer shrink-0"
//               />
//               <img
//                 src="../../public/tempIMG/book-00.png"
//                 className="w-16 h-16 p-2 rounded border-border border cursor-pointer shrink-0"
//               />
//               <img
//                 src="../../public/tempIMG/book-00.png"
//                 className="w-16 h-16 p-2 rounded border-border border cursor-pointer shrink-0"
//               />
//               <img
//                 src="../../public/tempIMG/book-00.png"
//                 className="w-16 h-16 p-2 rounded border-border border cursor-pointer shrink-0"
//               />
//               <img
//                 src="../../public/tempIMG/book-00.png"
//                 className="w-16 h-16 p-2 rounded border-border border cursor-pointer shrink-0"
//               />
//             </div>
//           </div>
//           {/* COLUMN 3 — RIGHT PANEL */}
//           <div className="mt-8 max-w-[280px] sm:max-w-[267px] md:max-w-[320px] w-full">
//             {/* Category */}
//             <div className="border-b border-border pb-4">
//               <h5 className="font-bold text-secondary">Category</h5>
//               <div className="inline-block mt-2 px-[10.5px] py-[5.5px] border border-border rounded-[5px]">
//                 Tech/Business
//               </div>
//             </div>

//             {/* Select language */}
//             <div className="border-b border-border py-8">
//               <h5 className="font-bold text-secondary mb-2">Select language</h5>
//               <div className="flex gap-2">
//                 <Button className="px-2.5 py-[5.5px] rounded-[5px] bg-primary text-white uppercase">
//                   UA
//                 </Button>
//                 <Button className="px-2.5 py-[5.5px] rounded-[5px] border border-border bg-background uppercase">
//                   ENG
//                 </Button>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="mt-4 flex items-center gap-2">
//               <h2 className="md:tracking-[-0.01em]">₴258</h2>
//               <span className="text-[20px] md:text-[22px] font-semibold leading-5 md:leading-[30.8px] line-through text-secondary">
//                 ₴540
//               </span>
//             </div>

//             <div className="flex gap-2 mt-4">
//               {/* ADD TO CART BUTTON */}
//               <Button className="bg-primary text-white rounded-lg font-bold w-60 sm:w-[219px] md:w-[272px] h-10">
//                 Add to cart
//               </Button>
//               {/* HEART BUTTON */}
//               <Button className="w-10 h-10 border border-border rounded-lg flex items-center justify-center bg-background">
//                 <Icon name="heart" className="h-4 w-4"></Icon>
//               </Button>
//             </div>

//             {/* Product details */}
//             <div className="mt-6">
//               <div className="flex justify-between pb-1.5 border-b border-border">
//                 <span className="text-secondary">Author</span>
//                 <span>Chris Miller</span>
//               </div>
//               <div className="flex justify-between py-1.5 border-b border-border">
//                 <span className="text-secondary">Cover type</span>
//                 <span>Hardcover</span>
//               </div>
//               <div className="flex justify-between py-1.5 border-b border-border">
//                 <span className="text-secondary">Number of pages</span>
//                 <span>432</span>
//               </div>
//               <div className="flex justify-between pt-1.5">
//                 <span className="text-secondary">Year of publication</span>
//                 <span>2024</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ABOUT + CHARACTERISTICS */}
//       <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-16">
//         {/* ABOUT */}
//         <div>
//           <p className="text-[20px] leading-5 md:text-[22px] font-semibold mb-4">
//             About
//           </p>
//           <div className="h-px bg-border mb-6"></div>
//           <h5 className=" mb-4">
//             An epic account of the decades-long battle to control the world’s
//             most critical resource—microchip technology
//           </h5>
//           <p className="mb-4">
//             Power in the modern world - military, economic, geopolitical - is
//             built on a foundation of computer chips. America has maintained its
//             lead as a superpower because it has dominated advances in computer
//             chips and all the technology that chips have enabled. (Virtually
//             everything runs on chips: cars, phones, the stock market, even the
//             electric grid.) Now that edge is in danger of slipping, undermined
//             by the naïve assumption that globalising the chip industry and
//             letting players in Taiwan, Korea and Europe take over manufacturing
//             serves America's interests. Currently, as Chip War reveals, China,
//             which spends more on chips than any other product, is pouring
//             billions into a chip-building Manhattan Project to catch up to the
//             US.
//           </p>
//           <p className="">
//             In Chip War economic historian Chris Miller recounts the fascinating
//             sequence of events that led to the United States perfecting chip
//             design, and how faster chips helped defeat the Soviet Union (by
//             rendering the Russians’ arsenal of precision-guided weapons
//             obsolete). The battle to control this industry will shape our
//             future. China spends more money importing chips than buying oil, and
//             they are China's greatest external vulnerability as they are
//             fundamentally reliant on foreign chips. But with 37 per cent of the
//             global supply of chips being made in Taiwan, within easy range of
//             Chinese missiles, the West's fear is that a solution may be close at
//             hand.
//           </p>
//         </div>

//         {/* CHARACTERISTICS */}
//         <div className="mt-8 sm:mt-10 lg:mt-0">
//           <h2 className="text-[20px] leading-5 font-semibold mb-4">
//             Characteristics
//           </h2>
//           <div className="h-px bg-border mb-6"></div>
//           <div className="">
//             <div className="flex justify-between pb-2 border-b border-border">
//               <span className="text-secondary">Author</span>
//               <span>Chris Miller</span>
//             </div>
//             <div className="flex justify-between py-2 border-b border-border">
//               <span className="text-secondary">Cover type</span>
//               <span>Hardcover</span>
//             </div>
//             <div className="flex justify-between py-2 border-b border-border">
//               <span className="text-secondary">Number of pages</span>
//               <span>432</span>
//             </div>
//             <div className="flex justify-between py-2 border-b border-border">
//               <span className="text-secondary">Year of publication</span>
//               <span>2024</span>
//             </div>
//             <div className="flex justify-between py-2 border-b border-border">
//               <span className="text-secondary">Publication</span>
//               <span>Nash Format</span>
//             </div>
//             <div className="flex justify-between py-2 border-b border-border">
//               <span className="text-secondary">Format</span>
//               <span>140x210 mm</span>
//             </div>
//             <div className="flex justify-between py-2 border-b border-border">
//               <span className="text-secondary">Language</span>
//               <span>UA</span>
//             </div>
//             <div className="flex justify-between pt-2">
//               <span className="text-secondary">Illustrations</span>
//               <span>No illustrations</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
