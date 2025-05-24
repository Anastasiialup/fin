'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/home', label: 'Головна' },
  { href: '/financial-records', label: 'Записи' },
  { href: '/categories', label: 'Категорії' },
  { href: '/wallet', label: 'Гаманець' },
  { href: '/goals', label: 'Цілі' },
  { href: '/statistics', label: 'Статистика' },
  { href: '/about', label: 'Про нас' },
  { href: '/profile', label: 'Профіль' },
];

const AppHeader = () => {
  const pathname = usePathname();

  return (
    <div className="header-container">
      <header>
        <h1>~ Ваш фінансовий планер ~</h1>
      </header>
      <nav>
        {
          navLinks.map(({ href, label }) => (
            <Link
              key={ href }
              href={ href }
              className={ `nav-link ${pathname === href ? 'active' : ''}` }
            >
              { label }
            </Link>
          ))
        }
      </nav>
    </div>
  );
};

export default AppHeader;
