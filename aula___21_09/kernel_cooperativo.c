/*
- Eduardo de Oliveira Almeida 190963
- Antônio Luís Canno de Araújo 190929
- Rodrigo Marigo da Silva - 152806
- Lucas de Abreu Furtado Garcia - 190581
- Gustavo Hideo Takao - 191005
*/

#include <stdio.h>

// #region FUNCTION RESPONSES

#define FAIL 0
#define SUCCESS 1
#define REPEAT 2

// #endregion FUNCTION RESPONSES

// #region BUFFER CONSTANTS

#define MAX_BUFFER 5
int inicio = 0, fim = 0;

// #endregion BUFFER CONSTANTS

typedef char (*executaBuffer)(void);

typedef struct Buffer
{
  char *nomeProcesso;
  executaBuffer executar;
} Buffer;

Buffer buffer[MAX_BUFFER];

void kernelLoop();
void kernelInit();
void kernelRemoveElement();
int nextPosition(int posicao);
char kernelAddProc(char *nomeProcesso, executaBuffer funcExecucao);
char processoNull();
char processoA();
char processoB();
char processoC();

int main()
{
  kernelInit();

  kernelRemoveElement(); // Erro de fila vazia

  kernelAddProc("a", &processoA);
  kernelAddProc("b", &processoB);
  kernelAddProc("c", &processoC);
  kernelAddProc("d", &processoA);
  kernelAddProc("e", &processoA);
  kernelAddProc("f", &processoNull);

  kernelLoop(); // Executa do 1 ao 3

  return 0;
}

void kernelInit()
{
  for (int i = 0; i < MAX_BUFFER; i++)
  {
    buffer[i].nomeProcesso = "0";
    buffer[i].executar = &processoA;
  }

  inicio = 0;
  fim = inicio;
}

int nextPosition(int posicao)
{
  return (posicao + 1) % (MAX_BUFFER + 1);
}

char kernelAddProc(char *nomeProcesso, executaBuffer funcExecucao)
{
  int novoFinal = nextPosition(fim);

  if ((novoFinal) == inicio)
  {
    printf("\n\nFila cheia!");
    return FAIL;
  }

  buffer[fim].nomeProcesso = nomeProcesso;
  buffer[fim].executar = funcExecucao;

  // printf("\n\nValor adicionado na fila:\n %c  \ninicio=%d\nfim=%d", buffer[fim].nomeProcesso[0], inicio, fim);
  fim = novoFinal;

  return SUCCESS;
}

void kernelRemoveElement()
{

  printf("\n fim=%d inicio=%d", fim, inicio);
  if (inicio != fim)
  {
    Buffer removido = buffer[inicio];
    inicio = nextPosition(inicio);

    // printf("\n\nRemoveu %c!", removido.nomeProcesso[0]);
    return;
  }

  printf("\n\nFila vazia!\n\n");
}

void kernelLoop()
{
  int i = inicio;

  if (i == fim)
  {
    printf("\n\nNao ha o que executar, fila vazia");

    return;
  }

  int maxExecutions = 20, countExecutions = 0;

  while (i != (fim) && maxExecutions > countExecutions)
  {
    countExecutions++;
    Buffer currentProcess = buffer[i];
    char nextStep = buffer[i].executar();
    i = nextPosition(i);
    kernelRemoveElement();

    if (nextStep == REPEAT)
    {
      printf("\n\nRepete o : %c", currentProcess.nomeProcesso[0]);

      kernelAddProc(currentProcess.nomeProcesso, currentProcess.executar);
    }
    if (nextStep == FAIL)
    {
      printf("\n\nErro ao executar o processo!");
    }
  }
}

char processoNull()
{
  printf("\n\nEssa função não deve ser chamada nunca, pois é o valor inicial do buffer");

  return FAIL;
}

char processoA()
{
  printf("\n\nResultado do processo A");

  return SUCCESS;
}

char processoB()
{
  printf("\n\nResultado do processo B");

  return REPEAT;
}

char processoC()
{
  printf("\n\nResultado do processo C");

  return REPEAT;
}
