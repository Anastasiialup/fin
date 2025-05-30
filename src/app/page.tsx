// app/page.jsx

import Link from 'next/link';
import { auth } from 'lib/auth';

const Home = async () => {
  const session = await auth();

  return (
    <div className="page-wrapper">
      <div className="form-box">
        <h1 className="form-title">Основна сторінка</h1>

        {
          session ? (
            <>
              <p className="form-text">
                                Ви увійшли як <span className="bold">{ session.user?.username || 'користувач' }</span>
              </p>
              <p className="form-subtext">
                                Почніть планувати свої фінанси вже сьогодні!
              </p>
              <div className="text-center">
                <Link href="/home" className="btn btn-emerald">
                                    Перейти до кабінету
                </Link>
              </div>
            </>
          ) : (
            <div className="form-options">
              <div>
                <p className="form-label">Якщо у вас немає аккаунту:</p>
                <Link href="/registration" className="btn btn-green">
                                    Реєстрація
                </Link>
              </div>
              <div>
                <p className="form-label">Якщо у вас вже є аккаунт:</p>
                <Link href="/login" className="btn btn-blue">
                                    Логін
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Home;
