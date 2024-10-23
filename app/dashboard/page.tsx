import { Card } from '@tremor/react';
import { User } from '@prisma/client';
import { getLoggedInUser, getUsers } from '../../services/users.service';
import UsersTable from '../table';
import { redirect } from 'next/navigation';
import Container from '../../ui/common/Container';

export default async function Dashboard() {
  const user = await getLoggedInUser();
  const { isAdmin } = user || { isAdmin: false };

  if (!isAdmin) {
    return redirect('/');
  }

  const allUsers: User[] = await getUsers();
  return (
    <>
      <Container className="">
        <Card className="my-6 p-0">
          <UsersTable users={allUsers} />
        </Card>
      </Container>
    </>
  );
}

/*
surname, nationality, mobile, email, expiredata, dob
*/
