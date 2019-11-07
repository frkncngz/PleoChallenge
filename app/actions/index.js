export const getExpenses = (limit, offset) => ({
  type: 'GET_EXPENSES',
  limit,
  offset,
});
