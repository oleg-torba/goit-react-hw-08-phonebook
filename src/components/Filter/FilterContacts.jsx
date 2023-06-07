
import Css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFIlteredContact } from 'redux/FilterSlice';
export function Filter() {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const changeFilter = e => {
    dispatch(addFIlteredContact(e.target.value));
  };
  console.log(filter);
  return (
    <>
   <div className={Css.find}>
      <label>
        <input
          placeholder="Find contact by name"
          value={filter}
          onChange={changeFilter} />
      </label>
    </div></>
  
  );
}
