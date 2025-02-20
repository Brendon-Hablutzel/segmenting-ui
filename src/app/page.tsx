import Link from 'next/link';
import UploadCloudIcon from './svg/UploadCloudIcon';

export default function Home() {
  return (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark grid grid-rows-[2fr_2fr_3fr] py-16 px-5 gap-5 font-[family-name:var(--font-ibm-sans)]">
      <div className="flex flex-col justify-end">
        <div className="flex justify-center">
          <UploadCloudIcon strokeWidth="4" pathClassName="stroke-text-light" />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-8">
        <div className="flex items-center justify-center">
          <h1 className="text-text-light text-7xl w-full text-center">
            Seg UI
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-text-light text-xl text-center">
            A platform for generalized image segmentation
          </h1>
        </div>
      </div>
      <div className="flex justify-center p-2">
        <div className="flex flex-col gap-5">
          <div className="flex justify-center">
            <Link
              href="/login"
              className="flex justify-center items-center text-2xl rounded-3xl bg-text-light text-text-dark hover:cursor-pointer transition ease-out duration-150 w-[25rem] h-[3rem]"
            >
              Log In
            </Link>
          </div>
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="flex justify-center items-center text-2xl border-[0.5px] border-text-light text-text-light rounded-3xl transition ease-out duration-150 w-[25rem] h-[3rem]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
