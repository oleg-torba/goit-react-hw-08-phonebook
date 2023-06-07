import { Link, Outlet } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { useSelector } from 'react-redux';
import { Section } from 'components/Section/Section';
import css from './Users.module.css';

export default function AuthNav() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div>
      <Section>
        <header>
          <nav className={css.header}>
           <div className={css.homeLink}>
           <Link className={css.headerLink} to="/">Home</Link>
           </div>
            {isLoggedIn && <Link  className={css.headerLink} to="/contacts">Contacts</Link>}
            {!isLoggedIn && (
              <>
                <div className={css.userBlock}>
                  <Link className={css.registerLink} to="register">Registration</Link>
                  <Link className={css.registerLink} to="login">Login</Link>
                </div>
              </>
            )}
             {isLoggedIn && <UserMenu />}
          </nav>
         
        </header>
        {!isLoggedIn && (
          <p className={css.title}>      
This is an application for storing phone book contacts. To gain access to all functions, please register or log in!</p>
         
        )}
      </Section>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
