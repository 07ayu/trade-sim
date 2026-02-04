1.  req - symbol, qty
2.  price = fetch current price
3.  total price = price * qty
4.  fetch wallet ledger -> compute balance
5.  if(balance < price) -> respond in sufiicient fund (though this shouldnt happen here balance should be store with user if balance low then shouldnt be placing order)
6.  create order
7.  debit entery in ledger
8.  commit transaction
9.  res send status
