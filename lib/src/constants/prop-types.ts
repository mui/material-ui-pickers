import * as PropTypes from 'prop-types';
import * as React from 'react';

const component = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.object,
  PropTypes.string,
]);

export type ComponentType = string | React.ComponentType<any>;

const date = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
]);

export type DateType = object | string | number | Date | null | undefined;

export default { component, date };
