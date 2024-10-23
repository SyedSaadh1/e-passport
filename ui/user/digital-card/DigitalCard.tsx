import { Badge, Card, Text } from '@tremor/react'
import React from 'react'
import { IUserProfile } from '../UserProfileContainer';
import { USER_STATUS_COLOR } from '../../../constants/user';

type Props = {
  user: IUserProfile;
}

const DigitalCard = ({ user }: Props) => {
  if (!user) return null;

  const { documents } = user;
  const profileUrl = documents?.find(document => document.fileType === 'selfiePhoto')?.imageUrl || `https://i.pravatar.cc/300`;

  return (
    <Card className="sm:mx-auto sm:max-w-xl p-0 mt-4 overflow-hidden">
      <Text className={`bg-slate-200 p-4 flex justify-between font-bold border-b-2 border-white relative z-10`}>
        <span>{user?.title}. {user?.firstName} {user?.middleName} {user?.surname}</span>
        {<Badge size="xs" color={USER_STATUS_COLOR[user?.status]}>{user?.status}</Badge>}
      </Text>
      <div className="p-3 grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className='col-span-1 max-h-[12rem]'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className='rounded-xl w-full h-full object-cover' src={profileUrl} alt={String(user?.name)} />
        </div>
        <div className='col-span-2 grid md:grid-cols-2 md:grid-cols-1 gap-3'>
          <div className='col-span-2'>
            <Text className='text-xl'><strong>{user?.ePassportUserId}</strong></Text>
          </div>
          <div>
            <Text><small>Firstname</small></Text>
            <Text><strong>{user?.firstName}</strong></Text>
          </div>
          <div>
            <Text><small>Middlename</small></Text>
            <Text><strong>{user?.middleName || "-"}</strong></Text>
          </div>
          <div>
            <Text><small>Surname</small></Text>
            <Text><strong>{user?.surname}</strong></Text>
          </div>
          <div>
            <Text><small>DOB</small></Text>
            <Text><strong>{(new Date(user?.dateOfBirth))?.toLocaleDateString()}</strong></Text>
          </div>
          <div>
            <Text><small>Email</small></Text>
            <Text><strong>{user?.email}</strong></Text>
          </div>
          <div>
            <Text><small>Mobile Number</small></Text>
            <Text><strong>{user?.mobileNumber}</strong></Text>
          </div>

          <div>
            <Text><small>Emirates Id</small></Text>
            <Text><strong>{user?.emiratesIdNumber}</strong></Text>
          </div>
          <div>
            <Text><small>Emirates Id Expiry</small></Text>
            <Text><strong>{(new Date(user?.emiratesIdExpiryDate))?.toLocaleDateString()}</strong></Text>
          </div>
        </div>
      </div>
    </Card>
  )
}


export default React.memo(DigitalCard);