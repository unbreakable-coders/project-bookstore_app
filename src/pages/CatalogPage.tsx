import { Dropdown } from '@/components/atoms/Dropdown';

export const CatalogPage = () => {
  return (
    <section className="space-y-4">
      <div className="pt-[64px] px-[152px]">
        <h1 className="text-4xl font-bold text-foreground">Paper books</h1>
        <p className="text-muted-foreground">10,305 books</p>
      </div>

      <div className="pt-[40px] px-[152px] flex gap-4 items-start">
        <div className="w-[176px]">
          <p className="text-sm text-muted-foreground mb-1">Sort by</p>
          <Dropdown label="Categories" />
        </div>

        <div className="w-[128px]">
          <p className="text-sm text-muted-foreground mb-1">Items on page</p>

          <Dropdown label="10" />
        </div>
      </div>

      <section className="pt-[24px] pb-[136px] px-[152px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="h-[506px] bg-card shadow rounded-xl p-4 flex flex-col gap-3">
            <img
              src="/covers/fifth-discipline.jpg"
              alt="The Fifth Discipline"
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold text-foreground">
              The Fifth Discipline
            </h3>
            <p className="text-sm text-muted-foreground">Peter M. Senge</p>
            <p className="text-base font-semibold text-foreground">€450</p>
            <p className="text-xs text-green-600 flex items-center">
              <img
                src="../icons/icon-in-stock.svg"
                alt="In stock"
                className="inline h-3 w-3 mr-1"
              />
            </p>
            <button className="mt-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              Add to cart
            </button>
          </div>

          <div className="h-[506px]bg-card shadow rounded-xl p-4 flex flex-col gap-3">
            <img
              src="/covers/misbehaving.jpg"
              alt="Misbehaving"
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold text-foreground">
              Misbehaving
            </h3>
            <p className="text-sm text-muted-foreground">Richard H. Thaler</p>
            <p className="text-base font-semibold text-foreground">€340</p>
            <p className="text-xs text-green-600">In stock</p>
            <button className="mt-auto px-4 py-2 bg-muted text-muted-foreground rounded-md cursor-default">
              Added
            </button>
          </div>

          <div className="h-[506px] bg-card shadow rounded-xl p-4 flex flex-col gap-3">
            <img
              src="/books/img/kindle/harry-potter-1.jpg"
              alt="Harry Potter and the Philosopher's Stone"
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold text-foreground">
              The Intelligent Investor
            </h3>
            <p className="text-sm text-muted-foreground">Benjamin Graham</p>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-foreground">€258</p>
              <p className="text-base line-through text-muted-foreground">
                €400
              </p>
            </div>
            <p className="text-xs text-green-600">In stock</p>
            <button className="mt-auto px-4 py-2 bg-muted text-muted-foreground rounded-md cursor-default">
              Added
            </button>
          </div>

          <div className="h-[506px]bg-card shadow rounded-xl p-4 flex flex-col gap-3">
            <img
              src="/covers/intelligent-investor.jpg"
              alt="The Intelligent Investor"
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold text-foreground">
              The Intelligent Investor
            </h3>
            <p className="text-sm text-muted-foreground">Benjamin Graham</p>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-foreground">€258</p>
              <p className="text-base line-through text-muted-foreground">
                €400
              </p>
            </div>
            <p className="text-xs text-green-600">In stock</p>
            <button className="mt-auto px-4 py-2 bg-muted text-muted-foreground rounded-md cursor-default">
              Added
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
