import { Button } from './Button.styled';
import PropTypes from 'prop-types';
export const LoadButton = ({ click }) => {
  return (
    <Button type="button" onClick={click}>
      Load more...
    </Button>
  );
};

LoadButton.propTypes = {
  click: PropTypes.func.isRequired,
};
