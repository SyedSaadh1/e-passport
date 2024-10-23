import { getLoggedInUser, getUserDetailsByID } from '../../../services/users.service';
import Container from '../../../ui/common/Container';
import UserProfileContainer from '../../../ui/user/UserProfileContainer';
import { redirect } from 'next/navigation';

interface OrderStatuses {
  [index: string]: string;
  PENDING: string;
  IN_PROGRESS: string;
  COMPLETED: string;
}

const statusClrs: OrderStatuses = {
  PENDING: "red",
  IN_PROGRESS: "blue",
  COMPLETED: "green"
}

export default async function UserProfile({ params }: { params: { userId: string } }) {
  const user = await getLoggedInUser();
  const profile = await getUserDetailsByID(params.userId);

  if (!user?.isAdmin || !profile) {
    return redirect('/')
  }
  return <Container className='py-4'>
    <UserProfileContainer profile={profile} />
  </Container>
}

