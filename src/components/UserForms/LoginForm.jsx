import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  loginAction,
  useLoginUserMutation,
} from 'redux/Authorization/AuthorizationAPI';
import css from './UserForms.module.css';

export function LoginForm() {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [loginUser, { isSuccess, error }] = useLoginUserMutation();

  useEffect(() => {
    if (error) {
      alert('Incorrect email or password');
    }
  });
  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setMail(value);
        break;

      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleLogin = e => {
    e.preventDefault();
    loginSave({ email, password });
    if (isSuccess) {
      setMail('');
      setPassword('');
    }

    dispatch(loginAction);
  };

  const loginSave = async user => {
    try {
      const returnUser = await loginUser(user, {
        selectFromResult: ({ data }) => data.user,
      });
      dispatch(loginAction(returnUser));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className={css.userForm} onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="mail"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button className={css.userFormBtn} type="submit">
          Login
        </button>
      </form>
    </>
  );
}
