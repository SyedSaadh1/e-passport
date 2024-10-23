'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState, useTransition } from 'react';
import { searchUsersByQuery } from '../../../server/actions/searchUser.action';
import Input from '../../common/Input';

interface SearchProps {
  id: string;
  label: string;
  [key: string]: any
}

export default function Search({
  id,
  label,
  ...otherProps
}: SearchProps) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const { type } = otherProps;

  async function handleSearch(value: string) {
    if (type === "date" && value) {
      value = (value as unknown as Date)?.getTime() + ""
    }
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(id, value);
    } else {
      params.delete(id);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  let defaultValue: any = searchParams.get(id);
  if (defaultValue && type === "date") {
    defaultValue = new Date(Number(defaultValue));
  }


  return <Input
    id={id}
    name={id}
    label={label}
    placeholder={`Search by ${label}`}
    spellCheck={false}
    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
    loading={isPending}
    defaultValue={defaultValue}
    {...otherProps}
  />

  // return (
  //   <div className="relative mt-5 max-w-md">
  //     <label htmlFor="search" className="sr-only">
  //       {labelName}
  //     </label>
  //     <div className="rounded-md shadow-sm">
  //       <div
  //         className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
  //         aria-hidden="true"
  //       >
  //         <MagnifyingGlassIcon
  //           className="mr-3 h-4 w-4 text-gray-400"
  //           aria-hidden="true"
  //         />
  //       </div>
  //       <input
  //         type="text"
  //         name="search"
  //         id="search"
  //         disabled={disabled}
  //         className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  //         placeholder={placeholderValue}
  //         spellCheck={false}
  //         onChange={(e) => handleSearch(e.target.value)}
  //       />
  //     </div>

  //     {isPending && (
  //       <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
  //         <svg
  //           className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //         >
  //           <circle
  //             className="opacity-25"
  //             cx="12"
  //             cy="12"
  //             r="10"
  //             stroke="currentColor"
  //             strokeWidth="4"
  //           />
  //           <path
  //             className="opacity-75"
  //             fill="currentColor"
  //             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //           />
  //         </svg>
  //       </div>
  //     )}
  //   </div>
  // );
}
