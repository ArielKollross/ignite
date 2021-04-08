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

  return next();
}

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  // simple way to check, but may not be efficient
  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf 
  );

  if( customerAlreadyExists ) {
    return response.status(400).json({ 
      "error": "CPF is already used!" 
    });
  }

  customers.push({ 
    id: uuidv4(),
    name,
    cpf, 
    statement: [] 
  });

  return response.status(201).send();
})

app.get("/account", (request, response) => {
  return response.status(200).json({customers});
})

// app.use(verifyExistsAccountDocument) // use in all routes 
app.get("/statement/", verifyExistsAccountDocument, (request, response) => {
  return response.status(200).json(getCustomerByDocument.statement);
});

app.listen(3333);