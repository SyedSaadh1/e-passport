import { checkIfUserIsAdmimByEmail, getLoggedInUser } from '../services/users.service';
import Navbar from './navbar';
import { getServerSession } from 'next-auth/next';

export default async function Nav() {
  const user = await getLoggedInUser();
  return <Navbar user={user} isAdmin={user?.isAdmin} />;
}
