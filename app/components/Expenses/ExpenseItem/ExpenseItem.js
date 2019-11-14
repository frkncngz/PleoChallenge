import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';

import i18n from '../../../locales/i18n';

// Styles
import styles from './styles';

const ExpenseItem = props => {
  const {
    expense,
    onAddReceiptPress,
    onAddCommentPress,
    onShowReceiptsPress,
    backgroundColor,
  } = props;
  return (
    <View style={styles.item}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Text style={styles.amountTitle}>{i18n.t('amount')}</Text>
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
      <View style={styles.nameRow}>
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
      </View>

      {expense.receipts.length > 0 ? (
        <TouchableOpacity
          style={styles.receiptRow}
          onPress={() => onShowReceiptsPress(expense)}>
          <Icon
            style={{}}
            name="attachment"
            size={15}
            color={EStyleSheet.value('$greyishBrown')}
          />
          <Text style={styles.receiptCount}>
            {expense.receipts.length === 1
              ? `${expense.receipts.length} ${i18n.t('singleReceiptAttached')}`
              : `${expense.receipts.length} ${i18n.t(
                  'multipleReceiptAttached',
                )}`}
          </Text>
        </TouchableOpacity>
      ) : null}

      {expense.comment != '' ? (
        <View style={styles.commentRow}>
          <Icon
            style={{}}
            name="comment"
            size={15}
            color={EStyleSheet.value('$greyishBrown')}
          />
          <Text style={styles.comment}>"{expense.comment}"</Text>
        </View>
      ) : null}

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onAddReceiptPress(expense)}>
          <Text style={styles.buttonText}>{i18n.t('addReceipt')}</Text>
        </TouchableOpacity>

        {expense.receipts.length > 0 ? (
          <View style={styles.buttonSeparator} />
        ) : null}
        {expense.receipts.length > 0 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => onShowReceiptsPress(expense)}>
            <Text style={styles.buttonText}>{`${i18n
              .t('receipts')
              .toUpperCase()} (${expense.receipts.length})`}</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.buttonSeparator} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onAddCommentPress(expense)}>
          <Text style={styles.buttonText}>{i18n.t('addComment')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ExpenseItem.propTypes = {
  expense: PropTypes.object.isRequired,
  onAddCommentPress: PropTypes.func.isRequired,
  onAddReceiptPress: PropTypes.func.isRequired,
  onShowReceiptsPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default ExpenseItem;
