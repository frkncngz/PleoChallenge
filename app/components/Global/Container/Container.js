import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';

const BaseContainer = ({children}) => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />
    {children}
  </SafeAreaView>
);

BaseContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseContainer;
