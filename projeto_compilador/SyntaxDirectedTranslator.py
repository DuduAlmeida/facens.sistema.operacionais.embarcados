import re

T_KEYWORD = "keyword"
T_OP = "op"
T_INT = "int"
T_STRING = "string"
T_ID = "id"
T_EOF = "eof"
T_DELIMITER = "delimiter"
T_BLOCK = "block"
T_VAR_TYPE = "var_type"
T_PARA = "parenthesis"

class Token():
    
    def __init__(self, tipo, valor=None):
        self.tipo = tipo
        self.valor = valor
        
    def __str__(self):
        return '<%s %s>' % (self.tipo, self.valor)
    
    def __repr__(self):
        return self.__str__()


class StopExecution(Exception):
    def _render_traceback_(self):
        pass

    
def afd_int(token):
    try:
        token = int(token)
        return True
    except:
        return False
    
def afd_string(token):
    if token[0] == '"' and token[-1] == '"':
        if '"' not in token[1:-1]:
            return True
        else:
            raise ValueError('Aspas em um local inesperado.')
    else:
        return False
    
def afd_identificador(token):
    regex = re.compile('[a-zA-Z0-9_]+')
    r = regex.match(token)
    if r is not None:
        if r.group() == token:
            return True
        else:
            return False
    else:
        return False

def afd_delimiter(token):
    return token == ";"

def afd_block(token):
    return token in ["{", "}"]

def afd_var_type(token):
    return token in ["int", "float", "string"]

def afd_para(token):
    return token in ["(", ")"]
    
def afd_principal(token):
    if token == "init":
        return Token(T_KEYWORD, 'init')
    
    elif token in "=+*":
        return Token(T_OP, token)
    
    elif afd_int(token):
        return Token(T_INT, token)
    
    elif afd_string(token):
        return Token(T_STRING, token)
    
    elif afd_delimiter(token):
        return Token(T_DELIMITER, token)
    
    elif afd_var_type(token):
        return Token(T_VAR_TYPE, token)
    
    elif afd_block(token):
        return Token(T_BLOCK, token)
    
    elif afd_para(token):
        return Token(T_PARA, token)
    
    elif afd_identificador(token):
        return Token(T_ID, token)
    
    else:
        raise ValueError('Valor inesperado')

class Parser():
    
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = -1
        self.token_atual = None
        self.symbol_table = {}
        
        self.proximo()

        
    def proximo(self):
        self.pos += 1
        
        if self.pos >= len(self.tokens):
            self.token_atual = Token(T_EOF)
        else:    
            self.token_atual = self.tokens[self.pos]

        print(self.token_atual)
        return self.token_atual
    
    
    def erro(self):
        raise Exception('Erro de sintaxe. %s' % (self.token_atual))
        
        
    def use(self, tipo, valor=None):
                
        if self.token_atual.tipo != tipo:
            self.erro()
        elif valor is not None and self.token_atual.valor != valor:
            self.erro()
        else:
            self.proximo()
    
    def instructions(self):
        """
        statements ::= <instruction> <instructions>
        """
        self.instruction()
        while self.token_atual.tipo in [T_VAR_TYPE, T_ID]:
            self.instruction()
    
    def instruction(self):
        """
        instruction ::= <var_type> <id> ;
        instruction ::= statement ;
        """
        if self.token_atual.tipo == T_VAR_TYPE:
            type = self.token_atual.valor
            self.use(T_VAR_TYPE)
            name = self.token_atual.valor
            #a semantic error was created when trying to declare a variable more than once 
            if name in self.symbol_table:
              raise Exception('Nome de variável repetido. %s' % (name))
            self.use(T_ID)
            self.use(T_DELIMITER, ";")
            self.symbol_table[name] = True
        else:
            self.statement()
            self.use(T_DELIMITER, ";")

    
    def start(self):
        """
        start ::= { instructions }
        """
        self.use(T_BLOCK, "{")
        self.instructions()
        self.use(T_BLOCK, "}")


    def statement(self):
        """
        statement ::= <id> <op => expr
        """
        name = self.token_atual.valor
        #a semantic error was created when trying to assign a non-existing id
        if name in self.symbol_table:
          self.use(T_ID)
        
          self.use(T_OP, '=')
        
          value = self.expr()

          self.symbol_table[name] = value
        else:
          raise Exception('Nome de variável não existe. %s' % (name))
    
    def expr(self) -> int:
        """
        expr ::= term ( <op +> | <op -> term )*
        """

        t = self.expr_t()
        res = self.expr_e_line(t)
        return res
    
    def expr_t(self) -> int:
        """
        expr_t ::= expr_f expr_t_line
        """
        r = self.expr_f()
        return self.expr_t_line(r)

    def expr_e_line(self, inherited_t: int):
        """
        expr_e_line ::= <op +> expr_t expr_e_line | epsilon
        """
        if self.token_atual.tipo == T_OP and self.token_atual.valor == "+":
            self.use(T_OP, "+")
            res = self.expr_t() + inherited_t
            return self.expr_e_line(res)
        # Prod empty
        return 0 + inherited_t

    def expr_t_line(self, inherited_t: int):
        """
        expr_e_line ::= <op *> expr_f expr_t_line | epsilon
        """
        if self.token_atual.tipo == T_OP and self.token_atual.valor == "*":
            self.use(T_OP, "*")
            a = self.expr_f()
            print(a, inherited_t)
            res = a * inherited_t
            return self.expr_t_line(res)
        # Prod empty
        return 1 * inherited_t

    def expr_f(self):
        """
        expr_f ::= ( expr ) | <id> | <int>
        """
        if self.token_atual.tipo == T_PARA:
            self.use(T_PARA, "(")
            res = self.expr()
            self.use(T_PARA, ")")
        elif self.token_atual.tipo == T_ID:
        #a semantic error was created when trying to use a non-existing variable
            if self.token_atual.valor in self.symbol_table:
              res = self.symbol_table[self.token_atual.valor]
              self.use(T_ID)
            else:
              raise Exception('Nome de variável não existe e não pode ser utilizada. %s' % (self.token_atual.valor))

        elif self.token_atual.tipo == T_INT:
            res = int(self.token_atual.valor)
            self.use(T_INT)
        else:
            self.erro()
        return res

##############################################################################
    
arquivo = open('codigo.js','r')
ln = 1

tokens = []

for l in arquivo.readlines():
    
    # analisador lexico
    
    l = l.replace('\n','') # remove break line
    
    for token in l.split():        
        try:
            tokens.append(afd_principal(token))
        except Exception as e:
            print(tokens)
            print(str(e) + " na posição %i da linha %i - %s" % (l.index(token), ln, token))
            raise StopExecution
    ln += 1

print([str(t) for t in tokens])
    
# synthetic analyzer

parser = Parser(tokens)
parser.start()
