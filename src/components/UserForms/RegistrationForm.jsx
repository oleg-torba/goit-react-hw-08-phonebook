import { useEffect, useState } from 'react';
import {
  authAction,
  useRegisterUserMutation,
} from 'redux/Authorization/AuthorizationAPI';
import { useDispatch} from 'react-redux';
import css from "./UserForms.module.css"

export function RegisterForm() {
  const dispatch = useDispatch();

  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [registerUser, { isSuccess, error }] = useRegisterUserMutation();
console.log(error)
useEffect(() => {
  if(error?.data?.name === "MongoError"){
    alert("user already exist")
  }
}, [error?.data?.name])
  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

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
  const handleSubmit = e => {
    e.preventDefault();
    saveRegister({ name, email, password });
 
    if (isSuccess) {
      setMail('');
      setPassword('');
    }
  };
  const saveRegister = async user => {
    try {
      const returnedUser = await registerUser(user, {
        selectFromResult: ({ data }) => data.user,
      });
      dispatch(authAction(returnedUser));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className={css.userForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={handleChange}
        />
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
        <button className={css.userFormBtn} type="submit">Registration</button>
      </form>
    </>
  );
}
