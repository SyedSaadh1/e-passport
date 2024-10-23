import React from 'react'
import Container from '../../ui/common/Container'
import { redirect } from 'next/navigation';
import { getLoggedInUser } from '../../services/users.service';
import UserDocuments from '../../ui/user/UserDocuments';


async function DocumentsPage() {
  const user = await getLoggedInUser();
  if (!user) {
    return redirect('/')
  }
  let files = user?.documents;

  return (
    <Container className='min-h-[75vh]'>
      <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mt-4">
        Documents
      </h3>
      <UserDocuments documents={files} />
    </Container>
  )
}

export default DocumentsPage