export const HomePage = () => {
  return (
    <>
      <header className="h-16 bg-amber-400">Home Page</header>

      <main className="bg-gray-800 mt-16">
        <div className="flex items-center justify-center flex-col">
          {' '}
          {/* Recommend bundle*/}
          <div className="flex items-center justify-center">
            <div className="h-96 w-8 mr-4 bg-amber-100"> arrow L </div>
            <div className=" h-96 w-5xl bg-amber-300">
              {' '}
              Recommendation image{' '}
            </div>
            <div className="h-96 w-8 ml-4 bg-amber-100"> arrow R</div>
          </div>
          <div className="flex items-center justify-between h-6 w-20 mt-2 bg-blue-400 text-3xl">
            <div className="ml-4"> - </div> {/*slide counter*/}
            <div className=""> - </div>
            <div className="mr-4"> - </div>
          </div>
        </div>
      </main>
    </>
  );
};
