'use client';
import React, { useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import Search from './search'
import { Button } from '@tremor/react'
import { COUNTRIES } from '../../../constants/countries';
import { USER_STATUS_OPTIONS } from '../../../constants/user';
import { RiSearch2Line } from '@remixicon/react';

const FIELDS = [
  { label: "First name", id: "firstName" },
  { label: "Surname", id: "surname" },
  { label: "Email", id: "email" },
  { label: "Mobile Number", id: "mobileNumber" },
  { label: "EPassport ID", id: "ePassportUserId" },
  { label: "Date of Birth", id: "dateOfBirth", type: "date" },
  { label: "Emirates Id Expiry Date", id: "emiratesIdExpiryDate", type: "date" },
  { label: "Nationality", id: "nationality", type: "select", options: COUNTRIES, search: true },
  { label: "Status", id: "status", type: "select", options: USER_STATUS_OPTIONS, search: true },
]

const UserSearch = () => {
  const [show, setShow] = useState(false);
  const { replace } = useRouter();
  const pathname = usePathname();
  const [_, startTransition] = useTransition();
  async function handleReset() {
    startTransition(() => {
      replace(`${pathname}?`);
    });
    setShow(false);
  }



  return (
    <form className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-4 bg-slate-100 p-6 rounded-lg shadow items-end">
      {!show && <Button variant='secondary' icon={RiSearch2Line} color='gray' onClick={() => setShow(true)}>Search</Button>}
      {show && <>
        {FIELDS.map(field => <Search key={field.id} {...field} />)}
        <Button type='reset' variant='primary' color='gray' onClick={handleReset}>Reset</Button>
      </>}

    </form>
  )
}

export default UserSearch