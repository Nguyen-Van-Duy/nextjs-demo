import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Sản phẩm</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Tất cả sản phẩm</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Thêm sản phẩm</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
