'use client';

import { usePathname } from 'next/navigation';
import { ComponentType } from 'react';
import UploadCloudIcon from '../../svg/UploadCloudIcon';
import Link from 'next/link';
import HomeIcon from '@/svg/HomeIcon';
import PlusIcon from '@/svg/PlusIcon';
import ImageIcon from '@/svg/ImageIcon';
import PowerIcon from '@/svg/PowerIcon';

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

  return (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark p-5 flex justify-center">
      {/* {checked ? ( */}
      <div className="grid grid-cols-[1fr_4fr] w-full">
        {/* stat of navbar */}
        <div className="mr-8 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-4 px-3">
              <div className="">
                <UploadCloudIcon
                  strokeWidth="8"
                  svgClassName="w-12 h-12"
                  pathClassName="stroke-text-light"
                />
              </div>
              <div className="w-1/2 font-bold text-2xl text-text-light select-none">
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
        {children}
      </div>
    </div>
  );
}
