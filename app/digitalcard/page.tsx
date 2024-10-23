import React from 'react'
import dbClient from '../../prisma/dbClient'
import DigitalCard from '../../ui/user/digital-card/DigitalCard'
import { getLoggedInUser } from '../../services/users.service'
import { redirect } from 'next/navigation'
import Container from '../../ui/common/Container'

type Props = {}

export default async function page({ }: Props) {

  const user = await getLoggedInUser();
  if (!user) {
    return redirect('/');
  }

  return (
    <Container>
      <div className='min-h=[50vh] py-6'>
        <DigitalCard user={user} />
      </div>
    </Container>
  )
}