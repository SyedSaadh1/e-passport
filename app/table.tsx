'use client';
import { User } from '@prisma/client';

import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Badge,
  Text,
  Button,
} from '@tremor/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { SearchQuery, searchUsersByQuery } from '../server/actions/searchUser.action';
import { USER_STATUS_COLOR } from '../constants/user';
import { USER_TABLE_COLUMNS } from '../ui/user/table/user.table.columns';
import UserSearch from '../ui/user/search/UserSearch';
import Link from 'next/link';

const TABLE_PAGE_SIZE = 8;

interface SearchParams {
  [key: string]: string | null;
}

const CUSTOM_CELL = [
  'ePassportUserId',
  'status'
]

export default function UsersTable({ users }: { users: User[] }) {
  const [searchUser, setSearchUsers] = useState<User[]>(users);
  const searchParams = useSearchParams();

  const payload = useMemo<SearchParams>(() => {
    const data: SearchParams = {};
    for (const key of searchParams.keys()) {
      data[key] = searchParams.get(key);
    }
    return data;
  }, [searchParams]);

  useEffect(() => {
    const performSearch = async () => {
      if (!Object.keys(payload).length) {
        setSearchUsers(users);
      } else {
        const searchUserResults = await searchUsersByQuery(payload as SearchQuery);
        setSearchUsers(searchUserResults);
      }
    };

    performSearch();
  }, [payload, users]);

  const table = useReactTable<User>({
    data: searchUser,
    columns: USER_TABLE_COLUMNS as ColumnDef<User>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: TABLE_PAGE_SIZE,
      },
    },
  });
  return <>
    <UserSearch />
    <Table>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="border-b border-tremor-border dark:border-dark-tremor-border"
          >
            {headerGroup.headers.map((header) => {
              const column = USER_TABLE_COLUMNS.find(
                (col) => col.accessorKey === header.id
              );
              const alignClass = column ? column.meta.align : '';
              return (
                <TableHeaderCell key={header.id} className={alignClass}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHeaderCell>
              );
            })}
          </TableRow>
        ))}
      </TableHead>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className='group'>
            {row.getVisibleCells().map((cell) => {
              const column = USER_TABLE_COLUMNS.find(
                (col) => col.accessorKey === cell.column.id
              );

              const alignClass = column ? column.meta.align : '';

              return (
                <TableCell key={cell.id} className={`${alignClass} group-hover:bg-slate-100`}>
                  {CUSTOM_CELL.includes(cell.column.id)
                    ? <>
                      {cell.column.id === 'ePassportUserId' && <Link className='group-hover:underline' href={`/users/${cell.row.original.ePassportUserId}`}>
                        <Text className='font-bold'>{cell.row.original.ePassportUserId}</Text>
                      </Link>}
                      {cell.column.id === 'status' && <Badge color={USER_STATUS_COLOR[cell.row.original.status]}>
                        <Text>{cell.row.original.status}</Text>
                      </Badge>}
                    </>
                    : flexRender(cell.column.columnDef.cell, cell.getContext())
                  }
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="p-4 border-t flex items-center justify-between bg-slate-100">
      <p className="flex gap-1">
        Page
        <span>{table.getState().pagination.pageIndex + 1}</span>
        of
        <span>{table.getPageCount()}</span>
      </p>
      <div className="inline-flex items-center gap-2">
        <Button
          color='gray'
          variant='secondary'
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Previous</span>
          <RiArrowLeftSLine
            aria-hidden={true}
          />
        </Button>
        <span
          className="h-5 border-r border-tremor-border dark:border-dark-tremor-border"
          aria-hidden={true}
        />
        <Button
          color='gray'
          variant='secondary'
          onClick={table.nextPage}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Next</span>
          <RiArrowRightSLine
            aria-hidden={true}
          />
        </Button>
      </div>
    </div>
  </>
}
