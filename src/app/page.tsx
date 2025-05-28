import Link from 'next/link';
import { auth } from 'lib/auth';

const Home = async () => {
  const session = await auth();
  // console.log(session);

  return (
    <div className="text-3xl font-bold underline p-6">
      <h1 className="mb-6">Основна сторінка</h1>

      {
        session ? (
          <>
            <p>Ви увійшли як { session.user?.username || 'користувач' }</p>
            { /* Тут можна додати меню для залогіненого користувача */ }
          </>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-lg">Якщо у вас немає аккаунту:</p>
              <Link href="/registration" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Реєстрація
              </Link>
            </div>
            <div>
              <p className="mb-2 text-lg">Якщо у вас вже є аккаунт:</p>
              <Link href="/login">
                Логін
              </Link>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Home;
