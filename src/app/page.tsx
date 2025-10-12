import { redirect } from 'next/navigation';

export default async function Home() {
  // const session = await auth();

  // if (session?.user) {
  //   redirect('/timer');
  // }

  redirect('/auth');
}
