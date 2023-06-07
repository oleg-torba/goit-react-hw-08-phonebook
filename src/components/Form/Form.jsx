
import { useState } from 'react';
import { ContactsApi } from 'redux/ContactsSlice';
import css from "./Form.module.css"

export function Form() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const contacts = ContactsApi.useFetchContactsQuery().data;
  const [addContact] = ContactsApi.useAddContactMutation();

  const formSubmit = data => {
    const findDublicate = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (findDublicate) {
      alert(`${data.name} already exsist`);
      return;
    }

    addContact({ name, number });
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    formSubmit({ name, number });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        <p className={css.formItem}>Name</p>
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>

      <label>
        <p className={css.formItem}>Number</p>
        <input
          className="formInput"
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>
      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
}
