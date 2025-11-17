import { PromoSlider } from '@/components/organisms/Home/PromoSlider.tsx';
import { Categories } from '@/components/organisms/Home/Categories.tsx';

export const HomePage = () => {
  return (
    <>
      <PromoSlider />
      <div className="h-[570px]">New Books</div>
      <Categories />
    </>
  );
};
