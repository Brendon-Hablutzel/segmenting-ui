import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark grid grid-rows-[2fr_2fr_3fr] py-16 px-5 gap-0 font-[family-name:var(--font-ibm-sans)]">
      <div className="flex flex-col justify-center gap-8">
        <div className="flex items-center justify-center">
          <h1 className="text-text-light text-7xl w-full text-center">
            404: Not Found
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-text-light text-xl text-center">
            The page you requested could not be found
          </h1>
        </div>
      </div>
      <div className="flex justify-center p-2">
        <div className="flex flex-col gap-5">
          <div className="flex justify-center">
            <Link
              href="/"
              className="flex justify-center items-center text-xl rounded-3xl bg-text-light text-text-dark hover:cursor-pointer transition ease-out duration-150 w-[25rem] h-[3rem]"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
