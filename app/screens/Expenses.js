import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  requireNativeComponent,
  UIManager,
  findNodeHandle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Fuse from 'fuse.js';

import config from '../config';
import i18n from '../locales/i18n';
import {getExpenses, updateExpense, uploadReceipt} from '../actions/index';

// Components
import BaseContainer from '../components/Global/Container';
import NavigationTitle from '../components/Global/NavigationTitle';
import ExpenseItem from '../components/Expenses/ExpenseItem';
const AddCommentView = requireNativeComponent('AddCommentView');

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginTop: 20,
    height: 40,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 13,
    shadowOpacity: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '$white',
    marginHorizontal: 20,
    borderRadius: 2,
    paddingHorizontal: 10,
  },
  search: {
    flex: 1,
  },
  list: {
    marginTop: 10,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  commentView: {
    height: 335,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallery: {
    height: 300,
    width: '80%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: (Dimensions.get('window').width * 0.8) / 3,
    height: (Dimensions.get('window').width * 0.8) / 3,
  },
});

class Expenses extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <NavigationTitle title={i18n.t('home')} />,
  });

  state = {
    modalVisible: false,
  };

  constructor(props) {
    super(props);
  }

  // Lifecycle
  componentWillMount() {
    this.fetchExpenses(true);
  }

  // Redux
  fetchExpenses = cold => {
    if (cold) {
      this.props.getExpenses(25, 0);
    } else {
      const {expenses, totalExpenses} = this.props;
      if (expenses.length < totalExpenses) {
        this.props.getExpenses(25, expenses.length);
      }
    }
  };

  setComment = e => {
    const {comment} = e.nativeEvent;
    const {expense} = this.state;
    this.props.updateExpense(expense.id, comment);
    this.setCommentModalVisible(false);
  };

  // Modals
  setCommentModalVisible(visible, expense) {
    this.setState({modalVisible: visible, expense}, () => {
      if (visible) {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(this.addCommentViewRef),
          UIManager.AddCommentView.Commands.updateFromManager,
          [],
        );
      }
    });
  }
  closeCommentModal = e => {
    this.setCommentModalVisible(false);
  };

  // Handlers
  onAddCommentPress = expense => {
    // this.setState({expense});
    this.setCommentModalVisible(!this.state.modalVisible, expense);
  };

  onAddReceiptPress = expense => {
    this.setState({expense});

    const options = {
      title: i18n.t('chooseAnOption'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.props.uploadReceipt(expense.id, response);
      }
    });
  };

  onShowReceiptsPress = expense => {
    this.props.navigation.navigate('Receipts', {
      receipts: expense.receipts.map(r => {
        return `${config.apiUrl}${r.url}`;
      }),
    });
  };

  onSearchChangeText = keyword => {
    const {expenses} = this.props;
    // this.setState({keyword});
    console.log('expenses');
    console.log(expenses);
    console.log('/expenses');

    console.log('keyword');
    console.log(keyword);
    console.log('/keyword');

    var options = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'merchant',
        'amount.value',
        'comment',
        'category',
        'user.first',
        'user.last',
        'user.email',
      ],
    };
    var fuse = new Fuse(expenses, options); // "list" is the item array
    var filteredExpenses = fuse.search(keyword);
    this.setState({filteredExpenses});
  };

  render() {
    const {modalVisible, expense, keyword, filteredExpenses} = this.state;
    const {expenses, loading} = this.props;

    return (
      <BaseContainer>
        <View style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <TextInput
              style={styles.search}
              onChangeText={text => this.onSearchChangeText(text)}
              placeholder={i18n.t('typeToFilter')}
              value={keyword}
            />
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={filteredExpenses ? filteredExpenses : expenses}
          refreshing={loading}
          onRefresh={() => this.fetchExpenses(true)}
          onEndReachedThreshold={0.5}
          onEndReached={() => this.fetchExpenses(false)}
          renderItem={({item, index}) => {
            const colors = ['#ffb3ba', '#ffffba', '#baffc9', '#bae1ff']; // just for the sake of UI
            return (
              <ExpenseItem
                expense={item}
                onAddCommentPress={this.onAddCommentPress}
                onAddReceiptPress={this.onAddReceiptPress}
                onShowReceiptsPress={this.onShowReceiptsPress}
                backgroundColor={colors[index % 4]}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <KeyboardAvoidingView style={styles.modal} behavior="padding" enabled>
            <AddCommentView
              style={styles.commentView}
              merchant={expense ? expense.merchant : null}
              onTextSubmit={this.setComment}
              onClose={this.closeCommentModal}
              ref={e => (this.addCommentViewRef = e)}
            />
          </KeyboardAvoidingView>
        </Modal>
      </BaseContainer>
    );
  }
}

const mapStateToProps = state => ({
  expenses: state.expenses || [],
  totalExpenses: state.totalExpenses || 0,
  loading: state.loading || false,
});

const mapDispatchToProps = {
  getExpenses,
  updateExpense,
  uploadReceipt,
};

Expenses = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Expenses);

export default Expenses;
