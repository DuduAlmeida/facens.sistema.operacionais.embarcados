# facens.sistema.operacionais.embarcados

## Criar Função

S -> id B
B -> EXP_OP VIRGULA ou Vazio
EXP_OP -> = J ou Vazio
VIRGULA -> , S ou Vazio
J -> int ou string ou float ou boleano

## Criar classe

S -> id { B }
B -> C EXP_OP ou Vazio
C -> constructor ( C_PARAMS ) { <instructions> }
C_PARAMS -> id C_OP VIRGULA
C_OP -> = j ou Vazio
VIRGULA -> , C_PARAMS ou Vazio
