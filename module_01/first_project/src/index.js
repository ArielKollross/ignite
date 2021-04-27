const express = require('express');
const { v4: uuidv4 }  = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

// Middleware
function verifyExistsAccountDocument(request, response, next) {
  const { cpf } = request.headers;

  const getCustomerByDocument = customers.find((customer) => customer.cpf === cpf);

  if( !getCustomerByDocument ) {
    return response.status(400).json({ "error": "Customer not found"});
  }

  request.customer = getCustomerByDocument;

  return next();
}

function getBalance(customer) {
  if(!customer || !customer.statement) {
    return response.status(422).json({ "error": "request can not be precessed"})
  }

  const balance = {
    amount: 0,
    debit: 0,
    balance: 0,
  }

  // [TODO] add loadash reduce
  for (let i in customer.statement) {
    if(customer.statement[i].type === "credit") {
      balance.amount += customer.statement[i].amount
    } else {
      balance.debit += customer.statement[i].amount 
    }
  }

  balance.balance = balance.amount - balance.debit

  return balance
}

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  // simple way to check
  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf 
  );

  if( customerAlreadyExists ) {
    return response.status(400).json({ 
      "error": "CPF is already used!" 
    });
  }

  const customer = { 
    id: uuidv4(),
    name,
    cpf, 
    statement: [] 
  }

  customers.push(customer);

  return response.status(201).json({ customer });
});

app.get("/account", (request, response) => {
  return response.status(200).json({customers});
});

// app.use(verifyExistsAccountDocument) // use in all routes 
app.get("/statement/", verifyExistsAccountDocument, (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer.statement);
});

app.post('/deposit', verifyExistsAccountDocument, (request, response) => {
  const { description, amount } = request.body;

  if( !description || !amount ) {
    return response.status(400).json({ 
      "error": "fields description/amount are mandatory"
    });
  }

  const { customer } = request;

  const statementOperation = {
    transaction_id: uuidv4(),
    description,
    amount,
    type: 'credit',
    created_at: new Date(),
  };

  customer.statement.push(statementOperation);

  return response.status(201).json({ customer });

}); 

app.post('/withdrawal', verifyExistsAccountDocument, (request, response) => {
  const { description, amount } = request.body;

  if( !description || !amount ) {
    return response.status(400).json({ 
      "error": "fields description/amount are mandatory"
    });
  } 

  const { customer } = request;

  const balance = getBalance(customer);

  if(balance.balance < amount) {
    return response.status(400).json({ "error": "Insufficient amount, operation canceled"})
  }

  const statementOperation = {
    transaction_id: uuidv4(),
    description,
    amount,
    type: 'debit',
    created_at: new Date(),
  };

  customer.statement.push(statementOperation);

  return response.status(201).json({ statementOperation });

});

app.listen(3333);