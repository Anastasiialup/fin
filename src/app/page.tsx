import { auth } from 'lib/auth';

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div className='text-3xl font-bold underline'>
      Main page with client menu for future
    </div>
  );
};

export default Home;
