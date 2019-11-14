export const getExpenses = (limit, offset) => ({
  type: 'GET_EXPENSES',
  limit,
  offset,
});

export const updateExpense = (id, comment) => ({
  type: 'UPDATE_EXPENSE',
  id,
  comment,
});

export const uploadReceipt = (id, file) => ({
  type: 'UPLOAD_RECEIPT',
  id,
  file,
});
