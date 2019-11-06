import EStyleSheet from 'react-native-extended-stylesheet';
import {StyleSheet} from 'react-native';

const styles = EStyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '$white',
    margin: 20,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '$lightGray',
    borderRadius: 6,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
  },
  topLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  topRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  amountTitle: {
    fontSize: 12,
  },
  amount: {
    fontSize: 30,
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
  },
  separator: {
    backgroundColor: '$lightGray',
    height: StyleSheet.hairlineWidth,
    flex: 1,
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
  },
  merchant: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginVertical: 5,
    borderRadius: 6,
    overflow: 'hidden',
    fontSize: 10,
  },
  buttons: {
    marginTop: 10,
    paddingTop: 10,
    borderTopColor: '$lightGray',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  receiptCount: {
    marginVertical: 5,
    fontSize: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSeparator: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: '$lightGray',
  },
});

export default styles;
