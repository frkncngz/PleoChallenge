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
    default:
      return state;
  }
};

export default reducer;
