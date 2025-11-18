import { Dropdown } from '@/components/atoms/Dropdown';
import {
  Pagination,
  PaginationList,
  PaginationPage,
  PaginationGap,
  PaginationPreviousButton,
  PaginationNextButton,
} from '@/components/atoms/Pagination';

export const CatalogPage = () => {
  const currentPage = 1; // поки що захардкоджено, потім зробимо динамічним

  return (
    <div className="min-h-screen">
      <section className="container space-y-4">
        <div className="pt-16">
          <h1 className="text-4xl font-bold text-foreground">Paper books</h1>
          <p className="text-muted-foreground">10,305 books</p>
        </div>

        <div className="pt-[40px] flex gap-4 items-start">
          <div className="w-44">
            <p className="text-sm text-muted-foreground mb-1">Sort by</p>
            <Dropdown label="Categories" />
          </div>

          <div className="w-32">
            <p className="text-sm w-32 text-muted-foreground mb-1">
              Items on page
            </p>
            <Dropdown label="10" />
          </div>
        </div>

        <section className="pt-6 gap-y-10 mx-auto justify-center">
          <div className="grid gap-4 justify-center sm:grid-cols-2 gap-y-10 lg:grid-cols-4">
            <div className="rounded-xl bg-card shadow p-4 flex flex-col gap-2 w-full max-w-69">
              <img
                src="/covers/fifth-discipline.jpg"
                alt="The Fifth Discipline"
                className="w-full h-[263px] object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-foreground">
                The Fifth Discipline
              </h3>
              <p className="text-sm text-muted-foreground">Peter M. Senge</p>
              <p className="text-base font-semibold text-foreground">€450</p>
              <p className="text-xs text-green-600 flex items-center">
                <img
                  src="/icons/icon-in-stock.svg"
                  alt="In stock"
                  className="inline h-3 w-3 mr-1"
                />
                In stock
              </p>
              <button className="mt-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                Add to cart
              </button>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col gap-2 w-full max-w-69">
              <img
                src="/covers/fifth-discipline.jpg"
                alt="The Fifth Discipline"
                className="w-full h-[263px] object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-foreground">
                The Fifth Discipline
              </h3>
              <p className="text-sm text-muted-foreground">Peter M. Senge</p>
              <p className="text-base font-semibold text-foreground">€450</p>
              <p className="text-xs text-green-600 flex items-center">
                <img
                  src="/icons/icon-in-stock.svg"
                  alt="In stock"
                  className="inline h-3 w-3 mr-1"
                />
                In stock
              </p>
              <button className="mt-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                Add to cart
              </button>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col gap-2 w-full max-w-69">
              <img
                src="/books/img/kindle/harry-potter-1.jpg"
                alt="Harry Potter and the Philosopher's Stone"
                className="w-full h-[263px] object-cover rounded-md"
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

            <div className="rounded-xl bg-card shadow p-4 flex flex-col gap-2 w-full max-w-69">
              <img
                src="/books/img/kindle/harry-potter-1.jpg"
                alt="Harry Potter and the Philosopher's Stone"
                className="w-full h-[263px] object-cover rounded-md"
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

            <div className="rounded-xl bg-card shadow p-4 flex flex-col gap-2 w-full max-w-69">
              <img
                src="/covers/fifth-discipline.jpg"
                alt="The Fifth Discipline"
                className="w-full h-[263px] object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-foreground">
                The Fifth Discipline
              </h3>
              <p className="text-sm text-muted-foreground">Peter M. Senge</p>
              <p className="text-base font-semibold text-foreground">€450</p>
              <p className="text-xs text-green-600 flex items-center">
                <img
                  src="/icons/icon-in-stock.svg"
                  alt="In stock"
                  className="inline h-3 w-3 mr-1"
                />
                In stock
              </p>
              <button className="mt-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                Add to cart
              </button>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col gap-2 w-full max-w-69">
              <img
                src="/covers/fifth-discipline.jpg"
                alt="The Fifth Discipline"
                className="w-full h-[263px] object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-foreground">
                The Fifth Discipline
              </h3>
              <p className="text-sm text-muted-foreground">Peter M. Senge</p>
              <p className="text-base font-semibold text-foreground">€450</p>
              <p className="text-xs text-green-600 flex items-center">
                <img
                  src="/icons/icon-in-stock.svg"
                  alt="In stock"
                  className="inline h-3 w-3 mr-1"
                />
                In stock
              </p>
              <button className="mt-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                Add to cart
              </button>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col gap-2 w-full max-w-69">
              <img
                src="/books/img/kindle/harry-potter-1.jpg"
                alt="Harry Potter and the Philosopher's Stone"
                className="w-full h-[263px] object-cover rounded-md"
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

            <div className="rounded-xl bg-card shadow p-4 flex flex-col gap-2 w-full max-w-69">
              <img
                src="/books/img/kindle/harry-potter-1.jpg"
                alt="Harry Potter and the Philosopher's Stone"
                className="w-full h-[263px] object-cover rounded-md"
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

        <section className="flex justify-center py-[64px] px-4">
          <Pagination>
            <PaginationList>
              <PaginationPreviousButton
                href={`?page=${currentPage - 1}`}
                disabled={currentPage === 1}
              />
              <PaginationPage href="?page=1">1</PaginationPage>
              <PaginationPage
                href="?page=2"
                isCurrent={currentPage === currentPage + 1}
              >
                2
              </PaginationPage>
              <PaginationPage
                href="?page=3"
                isCurrent={currentPage === currentPage + 2}
              >
                3
              </PaginationPage>
              <PaginationPage
                href="?page=4"
                isCurrent={currentPage === currentPage + 3}
              >
                4
              </PaginationPage>
              <PaginationGap />
              <PaginationPage href="?page=10">10</PaginationPage>
              <PaginationNextButton
                href={`?page=${currentPage + 1}`}
                disabled={currentPage === currentPage + 9}
              />
            </PaginationList>
          </Pagination>
        </section>
      </section>
    </div>
  );
};
