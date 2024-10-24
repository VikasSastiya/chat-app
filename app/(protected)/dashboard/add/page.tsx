// import AddFriendButton from '@/components/AddFriendButton'
// import { FC } from 'react'

// const page: FC = () => {
//   return (
//     <main className='pt-8'>
//       <h1 className='font-bold text-5xl mb-8'>Add a friend</h1>
//       <AddFriendButton />
//     </main>
//   )
// }

// export default page

import FriendSearch from '@/components/FriendSearch';

export default function FriendsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Find Friends</h1>
      <FriendSearch />
    </div>
  );
}