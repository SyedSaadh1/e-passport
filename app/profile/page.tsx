import { redirect } from 'next/navigation';
import Container from '../../ui/common/Container';
import UserRegisterForm from '../../ui/user/UserRegisterForm';
import { getLoggedInUser } from '../../services/users.service';

export default async function UserProfile({ params }: { params: { userId: string } }) {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect('/')
  }
  return <Container className='py-4'>
    <UserRegisterForm user={user} isEdit isAdmin={false} />
  </Container>
}

