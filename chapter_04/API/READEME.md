# Cadastro de Carro

**Requisitos funcionais (RF)**:
Deve ser possível cadastrar um novo carro
Deve ser possível listar todas as categorias

**Regra de negócio (RN)**:
Não deve ser possível ser cadastrado um carro com uma placa já existente
Não deve ser possível alterar a placa de um carro já cadastrado
O carro deve ser cadastrado com disponibilidade por padrão
O usuário responsável pelo cadastro deve ser um usuário adm.

# Listagem de Carro

**Requisitos funcionais (RF)**:
Deve ser possivel listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro

**Requisitos não funcionais (RNF)**:

**Regra de negócio (RN)**:
O usuário não precisa estar logado no sistema

# Cadastro de especificação no carro

**Requisitos funcionais (RF)**:
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listas todas as especificações
Deve ser possível listas todos os carros
**Requisitos não funcionais (RNF)**:

**Regra de negócio (RN)**:
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não Deve ser possível cadastrar uma especificação já existente para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário adm.

# Cadastro de imagem do carro

**Requisitos funcionais (RF)**:
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

**Requisitos não funcionais (RNF)**:
Utilizar o multer para upload do arquivo

**Regra de negócio (RN)**:
O usuário deve poder cadastrar mais de uma imgaem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário adm.

# Aluguel de carro

**Requisitos funcionais (RF)**:
Deve ser possível cadastrar ym alugel

**Requisitos não funcionais (RNF)**:
Utilizar o multer para upload do arquivo

**Regra de negócio (RN)**:
O aluguel deve ter duração minima de 24 horas
Não deve ser possível cadastrar um novo aluguel caso já exista um  aberto para o mesmo carro
Não deve ser possível cadastrar um novo aluguel caso já exista um  aberto para o mesmo usuário