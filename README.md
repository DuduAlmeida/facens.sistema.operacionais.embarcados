# facens.sistema.operacionais.embarcados

S -> A P
A -> id ou int
P -> S+ ou Vazio

S -> A P
A -> id ou int
P -> S O ou Vazio
0 -> + ou \* ou /

S -> id B ou Vazio
B -> EXP_OP VIRGULA S ou Vazio
EXP_OP -> = J ou Vazio
VIRGULA -> , ou Vazio
J -> int ou string ou float ou boleano

S -> id B
B -> EXP_OP VIRGULA ou Vazio
EXP_OP -> = J ou Vazio
VIRGULA -> , S ou Vazio
J -> int ou string ou float ou boleano
