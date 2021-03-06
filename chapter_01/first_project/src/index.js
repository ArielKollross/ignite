const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

// Middleware
function verifyExistsAccountDocument(request, response, next) {
    const { cpf } = request.headers;

    const getCustomerByDocument = customers.find((customer) => customer.cpf === cpf);

    if (!getCustomerByDocument) {
        return response.status(400).json({ "error": "Customer not found" });
    }

    request.customer = getCustomerByDocument;

    return next();
}

function getBalance(customer) {
    if (!customer || !customer.statement) {
        return response.status(422).json({ "error": "request can not be precessed" })
    }

    const balance = {
        amount: 0,
        debit: 0,
        balance: 0,
    }

    // [TODO] add loadash reduce
    for (let i in customer.statement) {
        if (customer.statement[i].type === "credit") {
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

    if(!cpf || !name){
        return response.status(400).json({"error": "Document/Name is required"})
    }

    // simple way to check
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if (customerAlreadyExists) {
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

app.get("/account/all", (request, response) => {
    return response.status(200).json({ customers });
});

// app.use(verifyExistsAccountDocument) // use in all routes 
app.get("/statement/", verifyExistsAccountDocument, (request, response) => {
    const { customer } = request;

    return response.status(200).json(customer.statement);
});

app.get("/statement/date", verifyExistsAccountDocument, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    if (!date) {
        return response.status(400).json({ "error": "date is required" })
    }

    const dates = [];

    for (let i in customer.statement) {
        console.log(customer.statement[i].created_at);
        if (customer.statement[i].created_at <= date) {
            dates.push(customer.statement[i]);
        }
    }

    if (!dates) {
        return response.status(200).json({ "message": "No data found" });
    }

    return response.status(200).json(dates);
});

app.post('/deposit', verifyExistsAccountDocument, (request, response) => {
    const { description, amount } = request.body;

    if (!description || !amount) {
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
        created_at: new Date().valueOf(),
    };

    customer.statement.push(statementOperation);

    return response.status(201).json({ customer });

});

app.post('/withdrawal', verifyExistsAccountDocument, (request, response) => {
    const { description, amount } = request.body;

    if (!description || !amount) {
        return response.status(400).json({
            "error": "fields description/amount are mandatory"
        });
    }

    const { customer } = request;

    const balance = getBalance(customer);

    if (balance.balance < amount) {
        return response.status(400).json({ "error": "Insufficient amount, operation canceled" })
    }

    const statementOperation = {
        transaction_id: uuidv4(),
        description,
        amount,
        type: 'debit',
        created_at: new Date().valueOf(),
    };

    customer.statement.push(statementOperation);

    return response.status(201).json({ statementOperation });

});

app.put('/account', verifyExistsAccountDocument, (request, response) => {
    const { name } = request.body;
    const { customer } = request;

    if(!name) {
        return response.status(400).json({ "error": "Field name is empty"});
    }

    customer.name = name;

    return response.status(201).json({ customer });

});

app.get('/account', verifyExistsAccountDocument, (request, response) => {
    const { customer } = request;

    return response.status(201).json({ customer });
});

app.delete('/account', verifyExistsAccountDocument, (request, response) => {
    const { customer } = request;

    customers.splice(customer, 1);

    return response.status(204).send();
});

app.get('/balance', verifyExistsAccountDocument, (request, response) => {
    const { customer } = request;

    const { balance } = getBalance(customer)

    if(!balance === undefined) {
        return response.status(400).json({ "error": "Can't get balance"});
    }

    return response.status(200).json({ balance });
});

app.listen(3333);