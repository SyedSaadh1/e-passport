import { Button } from '@tremor/react';
import Search from '../ui/user/search/search';
import UsersTable from './table';
import { checkIfUserIsAdmimByEmail, getLoggedInUser, getTotalDocumentsCountByUser, getUserDetailsByEmail, getUsers } from '../services/users.service';

import { User } from '@prisma/client'
import Link from 'next/link';
import { LoginDialog } from './containers/LoginDialog';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// import useSWR from "swr";

const fetcher = (path: string) => fetch(path).then((res) => res.json());

// const Images = () => {
//   const { data } = useSWR<{ Key?: string }[]>("/api/documents", fetcher)
//   return data?.map((image) => <S3Image Key={image.Key as string} />)
// }

// const S3Image = ({ Key }: { Key: string }) => {
//   const { data } = useSWR<{ src: string }>(`/api/documents/${Key}`, fetcher)
//   return data && <img src={data.src} />
// }

export default async function IndexPage() {

  const user = await getLoggedInUser();
  const { isAdmin, documents } = user || { isAdmin: false, documents: [] };
  const documentsCount = documents?.length || 0;

  const [urlPath, actionLabel] = documentsCount > 0 ? ['/documents', 'Verify Documents'] : ['/upload', 'Upload Documents'];

  return (
    <main className="min-h-[80vh] bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Welcome to ePassport
      </h1>
      <p className="text-lg text-gray-600 text-center mb-6">
        Your secure gateway to efficient user registration and verification.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {isAdmin && <Button variant="primary">
          <Link href='/dashboard'>Goto Dashboard</Link>
        </Button>}

        {user ? <>
          {!isAdmin && <Button variant="primary">
            <Link href={urlPath}>{actionLabel}</Link>
          </Button>}
        </> : <>
          <Button variant="primary">
            <Link href='/register'>Register Now</Link>
          </Button>
          <LoginDialog>
            <Button variant="secondary">Login</Button>
          </LoginDialog>
        </>}
      </div>
    </main>
  );
}
