import {  Formik } from 'formik';
import { Header, Forma, Button, Input} from './SearchBar.styled';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
const initialValues = {
  query: '',
  page: 1,
};
export const SearchBar = ({ updateQuery }) => {
  const handleSubmit = (values, { resetForm }) => {
    updateQuery(values);
    resetForm();
  };
  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Forma autoComplete="off">
          <Input
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />

          <Button type="submit">
            
            <FaSearch />
           
          
          </Button>
        </Forma>
      </Formik>
    </Header>
  );
};

SearchBar.propTypes = {
  updateQuery: PropTypes.func.isRequired,
};
