import React from 'react';
import {Text, Button, FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';

import {getExpenses} from '../actions/index';

// Components
import BaseContainer from '../components/Global/Container';
import ExpenseItem from '../components/Expenses/ExpenseItem';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {flex: 1},
  item: {
    flex: 1,
  },
});

class Expenses extends React.Component {
  constructor(props) {
    super(props);
  }
  onPress = expense => {
    console.log(`${expense.id} tapped`);;
  };
  render() {
    return (
      <BaseContainer>
        <Text>Expenses</Text>
        <FlatList
          style={styles.list}
          data={this.props.expenses}
          renderItem={({item}) => (
            <ExpenseItem expense={item} onPress={this.onPress} />
          )}
          keyExtractor={item => item.id}
        />
        <Button title="Get Expenses" onPress={this.props.getExpenses} />
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
