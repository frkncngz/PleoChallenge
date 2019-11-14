const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_EXPENSES':
      return {...state, loading: true};
    case 'EXPENSES_RECEIVED':
      return {
        ...state,
        expenses: state.expenses
          ? state.expenses.concat(action.expenses)
          : action.expenses,
        totalExpenses: action.totalExpenses,
        loading: false,
      };
    case 'UPDATE_EXPENSE':
      return {...state, loading: true};
    case 'EXPENSE_UPDATED':
      return {
        ...state,
        expense: action.expense,
        loading: false,
        expenses: state.expenses.map(e => {
          if (e.id === action.expense.id) {
            return action.expense;
          }
          return e;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
