#language: pt
Funcionalidade: Listagem

    Como usuário, desejo acessar a listagem
    Para que eu possa acessa meus dados de cadastro

    Cenario: Listagem sem registro
    Dado que o site não possui registro
    Quando acesso a listagem
    Entao devo visualizar a listagem vazia

    Cenario: Listagem com apenas um registro
    Dado que o site possui apenas um registro
    Quando acesso a listagem
    Entao devo visualizar apenas um registro
