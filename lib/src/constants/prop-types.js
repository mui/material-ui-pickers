import PropTypes from 'prop-types';

const date = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
]);

const dateRange = PropTypes.oneOfType([
  date,
  PropTypes.arrayOf(date),
]);

export default {
  date, dateRange
};
