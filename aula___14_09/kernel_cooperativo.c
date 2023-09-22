/*
- Eduardo de Oliveira Almeida 190963
- Antônio Luís Canno de Araújo 190929
- Rodrigo Marigo da Silva - 152806
- Lucas de Abreu Furtado Garcia - 190581
- Gustavo Hideo Takao - 191005
*/

#include <stdio.h>

#define MAX_BUFFER 5
int inicio = 0, fim = 0;

typedef void (*executaBuffer)(void);

typedef struct Buffer
{
  char *nomeProcesso;
  executaBuffer executar;
} Buffer;

Buffer buffer[MAX_BUFFER];

void kernelLoop();
void kernelRemoveElement();
void kernelInit();
int nextPosition(int posicao);
void adicionarElemento(char *nomeProcesso, executaBuffer funcExecucao);
void processoA();
void processoB();
void processoC();
void func3();
void func4();
void func5();
void func6();

int main()
{
  kernelInit();

  kernelRemoveElement(); // Erro de fila vazia

  adicionarElemento("1", &processoB);
  adicionarElemento("2", &processoC);
  adicionarElemento("3", &func3);
  adicionarElemento("4", &func4);
  adicionarElemento("5", &func5);
  adicionarElemento("6", &func6); // erro de fila cheia

  kernelLoop(); // Executa do 1 ao 5

  printf("\n\n\nRemover os adicionados:\n\n\n");

  kernelRemoveElement(); //"1"
  kernelRemoveElement(); //"2"
  kernelRemoveElement(); //"3"
  adicionarElemento("1", &processoB);
  adicionarElemento("2", &processoC);
  kernelLoop();  // Executa na ordem: 4,5,1,2
  kernelRemoveElement(); //"4"
  kernelRemoveElement(); //"5"
  kernelRemoveElement(); //"1"
  kernelRemoveElement(); //"2"
  kernelRemoveElement(); // Erro de fila vazia

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

void adicionarElemento(char *nomeProcesso, executaBuffer funcExecucao)
{
  int novoFinal = nextPosition(fim);

  if ((novoFinal) == inicio)
  {
    printf("\n\nFila cheia!");
    return;
  }

  buffer[fim].nomeProcesso = nomeProcesso;
  buffer[fim].executar = funcExecucao;

  printf("\n\nValor adicionado na fila:\n %c  \ninicio=%d\nfim=%d", buffer[fim].nomeProcesso[0], inicio, fim);
  fim = novoFinal;
  printf("novoFinal=%d", fim);
}

void kernelRemoveElement()
{

  printf("\n fim=%d inicio=%d", fim, inicio);
  if (inicio != fim)
  {
    Buffer removido = buffer[inicio];
    inicio = nextPosition(inicio);

    // return removido->nomeProcesso[0];
    printf("\n\nRemoveu %c!", removido.nomeProcesso[0]);
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

  while (i != (fim))
  {
    printf("\n\nINDEX EXECUTADO:%d", i);
    buffer[i].executar();
    i = nextPosition(i);
  }
}

void processoA()
{
  printf("\n\nEssa função não deve ser chamada nunca, pois é o valor inicial do buffer");
}

void processoB()
{
  printf("\n\nResultado da função 1");
}

void processoC()
{
  printf("\n\nResultado da função 2");
}

void func3()
{
  printf("\n\nResultado da função 3");
}

void func4()
{
  printf("\n\nResultado da função 4");
}

void func5()
{
  printf("\n\nResultado da função 5");
}

void func6()
{
  printf("\n\nResultado da função 6, que nunca é chamada :(");
}
