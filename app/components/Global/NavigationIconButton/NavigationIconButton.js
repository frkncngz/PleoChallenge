import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

import styles from './styles';

const NavigationIconButton = ({right, icon, onPress}) => (
  <Icon
    style={right ? styles.iconRight : styles.iconLeft}
    name={icon}
    size={30}
    color={EStyleSheet.value('$black')}
    onPress={onPress}
  />
);

NavigationIconButton.propTypes = {
  right: PropTypes.bool,
  icon: PropTypes.string,
  onPress: PropTypes.func,
};

NavigationIconButton.defaultProps = {
  right: false,
  icon: null,
  onPress: null,
};

export default NavigationIconButton;
