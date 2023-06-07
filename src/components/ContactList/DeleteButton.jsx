import { useDeleteContactMutation } from 'redux/ContactsSlice';

export function DeleteContacts({ id }) {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  return (
    <button
      type="button"
      onClick={() => {
        deleteContact(id);
      }}
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting' : 'Delete'}
    </button>
  );
}
