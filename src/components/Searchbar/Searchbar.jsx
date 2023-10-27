import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { StyledSearchbar } from './Searchbar.styled';

const Searchbar = ({ setQuery }) => {
  const [searchStr, setSearchStr] = useState('');

  const handleInputChange = ({ target }) => {
    setSearchStr(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchStr.trim() === '') {
      toast.warn('Please enter search query');
    }
    setQuery(searchStr);
    setSearchStr('');
  };
  console.log(searchStr);
  return (
    <StyledSearchbar>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <span className="button-label"></span>
          <BsSearch size="24px" />
        </button>
        <input
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
export default Searchbar;
