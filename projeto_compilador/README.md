# facens.compiladores

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

# If

IF -> <keyword if> ( ATTR_STATEMENT ) IF_CONTENT ou Vazio
IF_CONTENT -> { INSTRUCTION } <ELSE ou ELSEIF>
ELSE -> <keywoed else> {} Ou Vazio
ELSEIF -> <keywoed else> IF Ou Vazio

ATTR_STATEMENT -> <id ou string ou int ou float ou boolean> <ATTR_STATEMENT_CONTINUES>
ATTR_STATEMENT_CONTINUES -> <OP se for +-\*/<> será 1 vez, caso contrário são duas instâncias> <ATTR_STATEMENT>
