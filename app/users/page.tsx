import { Card } from '@tremor/react';
import { User } from '@prisma/client';
import { checkIfUserIsAdmimByEmail, getLoggedInUser, getUsers } from '../../services/users.service';
import UsersTable from '../table';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Container from '../../ui/common/Container';

export default async function Dashboard() {
  const user = await getLoggedInUser();
  const { isAdmin } = user || { isAdmin: false };

  if (!isAdmin) {
    return redirect('/');
  }

  const allUsers: User[] = await getUsers(); //result.rows as User[];
  return (
    <>
      <Container className="">
        <Card className="my-6 p-0">
          {/* <pre>{JSON.stringify(allUsers, null, 2)}</pre> */}
          <UsersTable users={allUsers} />
        </Card>
      </Container>
    </>
  );
}

/*
surname, nationality, mobile, email, expiredata, dob
*/
