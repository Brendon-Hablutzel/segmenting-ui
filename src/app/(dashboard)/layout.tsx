'use client';

import { usePathname } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';
import UploadCloudIcon from '../../svg/UploadCloudIcon';
import Link from 'next/link';
import HomeIcon from '@/svg/HomeIcon';
import PlusIcon from '@/svg/PlusIcon';
import ImageIcon from '@/svg/ImageIcon';
import PowerIcon from '@/svg/PowerIcon';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import MenuIcon from '@/svg/MenuIcon';
import { MOBILE_SIZE_CUTOFF } from '@/utils';
import XIcon from '@/svg/XIcon';

// TODO: session refresh

const NavbarLink = ({
  active,
  href,
  name,
  Icon,
}: {
  active: boolean;
  href: string;
  name: string;
  Icon: ComponentType<{
    strokeWidth: string;
    svgClassName: string;
    pathClassName: string;
  }>;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 ${active ? 'bg-[#1B251B]' : 'hover:bg-[#1B251B]/50'} transition ease-out duration-150 px-4 py-2 rounded-full`}
    >
      <Icon
        strokeWidth="1"
        svgClassName="w-8 h-8"
        pathClassName="stroke-text-light"
      />
      <div className="text-text-light text-xl">{name}</div>
    </Link>
  );
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  const { auth, authLoaded } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (authLoaded && !auth) {
      router.replace('/login');
    }
  }, [auth, authLoaded, router]);

  const windowDimensions = useWindowDimensions();

  const [menuOpen, setMenuOpen] = useState(false);

  return !authLoaded || !auth ? null : (
    <div className="max-w-[100vw] bg-bg-dark flex justify-center">
      {windowDimensions.width < MOBILE_SIZE_CUTOFF ? (
        <div className="w-full">
          <div className="flex justify-between px-4 pt-4">
            <div className="flex justify-start items-center gap-4">
              <div className="">
                <UploadCloudIcon
                  strokeWidth="8"
                  svgClassName="w-10 h-10"
                  pathClassName="stroke-text-light"
                />
              </div>
              <div className="w-1/2 font-bold text-2xl text-text-light select-none whitespace-nowrap">
                Seg UI
              </div>
            </div>
            <button
              className="hover:cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <XIcon size={25} pathClassName="fill-text-light" />
              ) : (
                <MenuIcon size={30} pathClassName="fill-text-light" />
              )}
            </button>
          </div>
          {menuOpen ? (
            <div className="text-xl text-text-light pt-4 px-4 flex flex-col gap-2">
              <Link
                href="/jobs"
                className={`transition ease-out duration-150 px-2 hover:cursor-pointer w-full py-2 rounded-xl ${pathName === '/jobs' ? 'bg-[#1B251B]' : 'hover:bg-[#1B251B]/60'}`}
              >
                Jobs
              </Link>
              <Link
                href="/add-job"
                className={`transition ease-out duration-150 px-2 hover:cursor-pointer w-full py-2 rounded-xl ${pathName === '/add-job' ? 'bg-[#1B251B]' : 'hover:bg-[#1B251B]/60'}`}
              >
                Add Job
              </Link>
              <Link
                href="/modules"
                className={`transition ease-out duration-150 px-2 hover:cursor-pointer w-full py-2 rounded-xl ${pathName === '/modules' ? 'bg-[#1B251B]' : 'hover:bg-[#1B251B]/60'}`}
              >
                Modules
              </Link>
            </div>
          ) : null}
          <div className="p-4 max-h-screen">{children}</div>
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_4fr] w-full">
          {/* start of navbar */}
          <div className="mr-8 flex flex-col justify-between h-[100vh] p-5 sticky top-0">
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-4 px-3">
                <div className="">
                  <UploadCloudIcon
                    strokeWidth="8"
                    svgClassName="w-12 h-12"
                    pathClassName="stroke-text-light"
                  />
                </div>
                <div className="w-1/2 font-bold text-2xl text-text-light select-none whitespace-nowrap">
                  Seg UI
                </div>
              </Link>
              <div className="flex flex-col gap-2">
                <NavbarLink
                  active={pathName === '/jobs'}
                  href="/jobs"
                  name="Jobs"
                  Icon={HomeIcon}
                />
                <NavbarLink
                  active={pathName === '/add-job'}
                  href="/add-job"
                  name="Add Job"
                  Icon={PlusIcon}
                />
                <NavbarLink
                  active={pathName === '/modules'}
                  href="/modules"
                  name="Modules"
                  Icon={ImageIcon}
                />
              </div>
            </div>
            <NavbarLink
              active={false}
              href="/logout"
              name="Logout"
              Icon={PowerIcon}
            />
          </div>
          <div className="p-5 max-h-screen">{children}</div>
        </div>
      )}
    </div>
  );
}
