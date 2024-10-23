'use client'
import { User } from '@prisma/client'
import React, { useState } from 'react'

import { RiFolderOpenLine, RiIdCardLine, RiShieldUserLine, RiUser2Line } from '@remixicon/react';


import {
  Button,
  List,
  Title,
} from '@tremor/react';
import UserRegisterForm from './UserRegisterForm';
import UserDocuments from './UserDocuments';
import DigitalCard from './digital-card/DigitalCard';

export interface IUserProfileDocument {
  imageUrl: string;
  id: string;
  fileType: string;
  extension: string;
  path: string;
  status?: string;
}

export interface IUserProfile extends User {
  documents: IUserProfileDocument[]
  isAdmin?: boolean;
}

interface UserProfileContainerProps {
  profile: IUserProfile
}

const VIEW_SELECTION = {
  PROFILE: 0,
  DOCUMENTS: 1,
  DIGITAL_CARD: 2,
}

const VIEW_BUTTONS = [
  {
    label: 'Profile',
    icon: RiUser2Line
  },
  {
    label: 'Documents',
    icon: RiFolderOpenLine
  },
  {
    label: 'Card',
    icon: RiIdCardLine
  },
]


const UserProfileContainer = ({ profile }: UserProfileContainerProps) => {
  const [view, setView] = useState(VIEW_SELECTION.PROFILE);
  const { title, firstName, middleName, surname } = profile;
  const fullName = (`${title} ${firstName} ${middleName} ${surname}`).trim();

  return (
    <div>
      <header className='p-2 border-b'>
        <Title className='flex gap-2 items-center'><RiShieldUserLine />{fullName}&apos;s User Verifcation Details</Title>
      </header>
      <div className='grid md:grid-cols-6 gap-4 py-4'>
        <aside className=''>
          <List className='flex md:flex-col gap-2'>
            {VIEW_BUTTONS.map(({ label, icon }, idx) => <List key={idx} className='flex-1'>
              <Button onClick={() => setView(idx)} className='w-full justify-start' variant={idx == view ? 'primary' : 'secondary'} icon={icon}>{label}</Button>
            </List>)}
          </List>
        </aside>
        <main className='md:col-span-5'>
          {view === VIEW_SELECTION.PROFILE && <UserRegisterForm user={profile} isAdmin />}
          {view === VIEW_SELECTION.DOCUMENTS && <UserDocuments documents={profile?.documents} isAdmin />}
          {view === VIEW_SELECTION.DIGITAL_CARD && <DigitalCard user={profile} />}
        </main>
      </div>
    </div>
  )
}

export default UserProfileContainer