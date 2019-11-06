import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

// Styles
import styles from './styles';

const ExpenseItem = props => {
  const {expense, onPress, backgroundColor} = props;
  console.log('styles');
  console.log(styles);
  console.log('/styles');
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(expense)}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Text style={styles.amountTitle}>Amount</Text>
          <Text style={styles.amount}>
            {expense.amount.value} {expense.amount.currency}
          </Text>
        </View>
        <View style={styles.topRight}>
          <Text style={styles.date}>
            {moment(expense.date).format('MMM D, YYYY')}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      <Text style={styles.name}>
        {expense.user.first} {expense.user.last}
      </Text>
      <Text
        style={{
          ...styles.merchant,
          backgroundColor: backgroundColor,
        }}>
        {expense.merchant}
      </Text>
      <Text style={styles.receiptCount}>3 receipts</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text>Add Receipt</Text>
        </TouchableOpacity>
        <View style={styles.buttonSeparator} />
        <TouchableOpacity style={styles.button}>
          <Text>Add Comment</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

ExpenseItem.propTypes = {
  expense: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default ExpenseItem;
