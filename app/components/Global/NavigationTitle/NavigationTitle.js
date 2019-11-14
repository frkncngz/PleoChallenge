import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import styles from './styles';

const NavigationTitle = ({title}) => <Text style={styles.title}>{title}</Text>;

NavigationTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

NavigationTitle.defaultProps = {
  title: '',
};

export default NavigationTitle;
