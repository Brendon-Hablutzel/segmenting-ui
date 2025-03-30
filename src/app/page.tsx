import Link from 'next/link';
import UploadCloudIcon from '../svg/UploadCloudIcon';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-text-light h-screen">
      <div className="sticky top-0 z-[1000] flex justify-between items-center px-8 py-9 bg-[#061006] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] h-14">
        <div className="flex justify-start items-center gap-7 select-none">
          <div className="flex justify-between items-center gap-4">
            <div>
              <UploadCloudIcon
                strokeWidth="5"
                pathClassName="stroke-text-light"
                svgClassName="h-10 w-10"
              />
            </div>
            <div className="text-2xl whitespace-nowrap">Seg UI</div>
          </div>
          <div className="text-lg max-sm:hidden">
            <Link
              href="https://github.com/Brendon-Hablutzel/segmenting-ui"
              target="_blank"
            >
              source
            </Link>
          </div>
        </div>
        <div className="flex justify-end items-center gap-5">
          <div className="flex justify-center items-center whitespace-nowrap py-[1.1rem] px-6 select-none transition ease-out duration-150 rounded-2xl h-[2rem] text-lg border-[0.5px] border-text-light text-text-light hover:cursor-pointer">
            <Link href="/login">Log In</Link>
          </div>
          <div className="max-sm:hidden flex justify-center items-center whitespace-nowrap py-[1.1rem] px-6 select-none transition ease-out duration-150 rounded-2xl h-[2rem] text-lg bg-text-light text-text-dark hover:cursor-pointer hover:brightness-75">
            <Link href="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col items-center justify-center gap-5 md:gap-6 animate-fadeIn">
        <div className="text-4xl sm:text-5xl md:text-6xl leading-tight font-bold text-center w-[90%] sm:w-[85%] md:w-[80%] lg:w-[80%] xl:w-[70%]">
          Generalized image transformation and analysis
        </div>
        <div className="text-base sm:text-lg md:text-xl text-center w-[95%] sm:w-[85%] md:w-[75%] lg:w-[55%] xl:w-[45%]">
          Just upload an image, select from a variety of modules, and processing
          will occur in seconds
        </div>
        <div className="text-center bg-text-light text-bg-dark py-[0.3rem] px-14 rounded-2xl text-xl select-none transition ease-out duration-150 hover:cursor-pointer hover:brightness-75">
          <Link href="/signup">Create an account</Link>
        </div>
        <div className="relative h-[65vw] sm:h-[370px] md:h-[400px] mt-3 max-w-[600px] w-[90%]">
          <Image
            className="object-cover max-w-[90%] animate-fromLeft absolute top-0 left-0 shadow-lg rounded-lg border-[1px] border-text-light/10"
            alt="screenshot of dashboard"
            src={'/dashboard-screenshot.png'}
            width={500}
            height={100}
          />
          <Image
            className="w-[80%] max-w-[350px] object-cover animate-fromRight absolute bottom-0 right-0 shadow-lg rounded-lg border-[1px] border-text-light/10"
            alt="screenshot of add jobs page"
            src={'/add-job-screenshot.png'}
            width={350}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
