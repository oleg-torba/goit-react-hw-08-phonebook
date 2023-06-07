import Css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { DeleteContacts } from './DeleteButton';

import { useFetchContactsQuery } from 'redux/ContactsSlice';
import { Form } from 'components/Form/Form';
import { Section } from 'components/Section/Section';
import { Filter } from 'components/Filter/FilterContacts';

export function ContactList() {
  const { data: contacts } = useFetchContactsQuery();
  console.log(contacts);
  const filter = useSelector(state => state.filter);
  console.log(filter);

  let visibleContacts = [];
  if (contacts) {
    visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  console.log(visibleContacts);

  return (
    <>
      <Section>
        <Form />

        {contacts && (
          <>
            <Filter />
            <div>
              <ul className={Css.contactBlock}>
                {visibleContacts.map(item => {
                  return (
                    <>
                      <li className={Css.contactList} key={item.id}>
                        <div className={Css.contactValue}>
                          <span className={Css.contactItem}>{item.name}</span>
                          <span className={Css.contactItem}>{item.number}</span>
                        </div>
                        {<DeleteContacts id={item.id} />}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </Section>
    </>
  );
}
