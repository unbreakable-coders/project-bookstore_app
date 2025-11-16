import { Icon } from '../../atoms/Icon';
import { Image } from '../../atoms/Image';

export const PromoSlider = () => {
  return (
    <main className="mt-16 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center relative">
        <button className="h-[400px] w-8 mr-4 flex justify-center items-center rounded-2xl hover:shadow-xl hover:bg-gray-200 hover:transition-all duration-300">
          <Icon name="arrowLeft" />
        </button>

        <div className="relative h-[400px] w-[1040px] rounded-3xl overflow-hidden bg-[#5A86D1]">
          <Image
            name="banner"
            className="absolute inset-0 object-cover z-0 h-full w-full"
          />

          <div className="relative z-10 pl-[72px] pt-[60px] flex flex-col gap-5 max-w-[50%]">
            <h1 className="text-black text-5xl font-bold">
              Ukraine literature
            </h1>

            <div className="bg-white text-black px-4 py-3 rounded-xl text-3xl font-bold w-fit">
              -50%
            </div>
          </div>
          <div className="absolute top-[62%] left-1/3 -translate-x-1/2 flex gap-6 z-10">
            <Image
              name="bookUA1"
              className="w-40 rounded-xl shadow-md hover:-translate-y-7 hover:transition-shadow duration-300"
            />
            <Image
              name="bookUA2"
              className="w-40 rounded-xl shadow-md hover:-translate-y-7 hover:transition-shadow duration-300"
            />
            <Image
              name="bookUA3"
              className="w-40 rounded-xl shadow-md hover:-translate-y-7 hover:transition-shadow duration-300"
            />
          </div>
        </div>

        <button className="h-[400px] w-8 ml-4 flex justify-center items-center rounded-2xl hover:shadow-xl hover:bg-gray-200 hover:transition-all duration-300">
          <Icon name="arrowRight" />
        </button>
      </div>
    </main>
  );
};
