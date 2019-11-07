import React from 'react';
import {
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Alert,
  requireNativeComponent,
  UIManager,
  findNodeHandle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';

import {getExpenses} from '../actions/index';

// Components
import BaseContainer from '../components/Global/Container';
import ExpenseItem from '../components/Expenses/ExpenseItem';
const AddCommentView = requireNativeComponent('AddCommentView');

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {flex: 1},
  item: {
    flex: 1,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b3b3b3aa',
  },
  commentView: {
    // flex: 1,
    height: 300,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Expenses extends React.Component {
  state = {
    modalVisible: false,
  };
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getExpenses();
  }

  onPress = expense => {  
    this.setModalVisible(!this.state.modalVisible, expense);
  };

  setModalVisible(visible, expense) {
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

  setComment = e => {
    const {comment} = e.nativeEvent;
    this.setModalVisible(false);
  };

  closeModal = e => {
    this.setModalVisible(false);
  };

  render() {
    const {modalVisible, expense} = this.state;
    const {expenses} = this.props;

    return (
      <BaseContainer>
        <FlatList
          style={styles.list}
          data={expenses}
          renderItem={({item, index}) => {
            const colors = ['#ffb3ba', '#ffffba', '#baffc9', '#bae1ff'];
            return (
              <ExpenseItem
                expense={item}
                onPress={this.onPress}
                backgroundColor={colors[index % 4]}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <KeyboardAvoidingView style={styles.modal} behavior="padding" enabled>
            <AddCommentView
              style={styles.commentView}
              merchant={expense ? expense.merchant : null}
              onTextSubmit={this.setComment}
              onClose={this.closeModal}
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
});

const mapDispatchToProps = {
  getExpenses: getExpenses,
};

Expenses = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Expenses);

export default Expenses;
