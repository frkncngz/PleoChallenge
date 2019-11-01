const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_EXPENSES':
      return {...state, loading: true};
    case 'EXPENSES_RECEIVED':
      return {...state, expenses: action.expenses, loading: false};
    default:
      return state;
  }
};

export default reducer;
