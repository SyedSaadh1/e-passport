'use client'
/* eslint-disable @next/next/no-img-element */
import React, {  useCallback, useEffect, useMemo, useState } from 'react'
import { IUserProfileDocument } from './UserProfileContainer'
import { Button, Callout } from '@tremor/react'
import Link from 'next/link'
import Document from './Document'
import { approveDocuments } from '../../server/actions/admin/document.actions'
import { USER_STATUS } from '../../constants/user'
import { useRouter } from 'next/navigation';

type UserDocumentsProps = {
  documents: IUserProfileDocument[],
  isAdmin?: boolean
}



export default function UserDocuments({ documents, isAdmin }: UserDocumentsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status) {
      router.refresh();
    }
  }, [status, router])

  const { files, selfies } = useMemo(() => {
    if (!documents?.length) {
      return {
        files: [],
        selfies: [],
      }
    }

    return documents.reduce((prev, curr) => {
      if (curr.fileType.toLowerCase().includes("selfie")) {
        prev.selfies.push(curr);
      } else {
        prev.files.push(curr);
      }
      return prev;
    }, {
      files: [],
      selfies: [],
    } as { files: IUserProfileDocument[], selfies: IUserProfileDocument[] })

  }, [documents]);

  const onActionClick = useCallback(async (action: string) => {
    setIsLoading(true);
    setStatus(false);
    const status = await approveDocuments(documents, action);
    setStatus(status);
    setIsLoading(false);
  }, [documents]);


  if (!documents?.length) {
    return <Callout title="No Documents uploaded yet" color="red" className='mt-2'>
      {!isAdmin && <>Please upload yours documents <Link href="/upload" className='underline'>Here</Link></>}
    </Callout>
  }

  return <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between'>
    {files.map((file) => <Document {...file} key={file.fileType} isAdmin={isAdmin} />)}
    {selfies.map((file) => <Document {...file} key={file.fileType} isAdmin={isAdmin} video={file.fileType === "selfieVideo"} />)}

    {isAdmin && (
      <div className="flex h-full items-end justify-end gap-4 lg:col-span-2 ">
        <Button loading={isLoading} color="red" onClick={() => onActionClick(USER_STATUS.REJECTED)} name="REJECT">Reject ALL</Button>
        <Button loading={isLoading} color="green" onClick={() => onActionClick(USER_STATUS.APPROVED)} name="APPROVED">Approve ALL</Button>
      </div>
    )}
  </div>
}


