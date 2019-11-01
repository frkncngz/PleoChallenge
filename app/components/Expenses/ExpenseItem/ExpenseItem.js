import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

// Styles
import styles from './styles';

const ExpenseItem = props => {
  const {expense, onPress} = props;

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(expense)}>
      <Text>{expense.id}</Text>
    </TouchableOpacity>
  );
};

ExpenseItem.propTypes = {
  expense: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ExpenseItem;
