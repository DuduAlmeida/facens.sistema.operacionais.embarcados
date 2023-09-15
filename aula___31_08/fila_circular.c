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

typedef struct Buffer
{
  char *nomeProcesso;
  int memoriaAloc;
  float tempoExec;
} Buffer;

Buffer buffer[MAX_BUFFER];

int proximaPosicao(int posicao);
void adicionarElemento(char *nomeProcesso, int memoriaAloc, float tempoExec);
void removerElemento();

int main()
{
  removerElemento();
  adicionarElemento("1", 128, 1.32);
  adicionarElemento("2", 128, 1.32);
  adicionarElemento("3", 128, 1.32);
  adicionarElemento("4", 128, 1.32);
  adicionarElemento("5", 128, 1.32);
  adicionarElemento("6", 128, 1.32); // erro

  printf("\n\n\nRemover os adicionados:\n\n\n");

  removerElemento(); //"1"
  removerElemento(); //"2"
  removerElemento(); //"3"
  removerElemento(); //"4"
  removerElemento(); //"5"
  removerElemento(); // erro

  return 0;
}

int proximaPosicao(int posicao)
{
  return (posicao + 1) % (MAX_BUFFER + 1);
}

void adicionarElemento(char *nome_processo, int memoria_aloc, float tempo_exec)
{
  int novoFinal = proximaPosicao(fim);

  if ((novoFinal) == inicio)
  {
    printf("\n\nFila cheia!");
    return;
  }

  buffer[fim].nomeProcesso = nome_processo;
  buffer[fim].memoriaAloc = memoria_aloc;
  buffer[fim].tempoExec = tempo_exec;

  // printf("\nValor adicionado na fila:\n\r %c\n\r %d\n\r%.2f",fila[fim].nomeProcesso[0],fila[fim].memoriaAloc,fila[fim].tempoExec = tempo_exec);
  printf("\n\nValor adicionado na fila:\n %c  \ninicio=%d\nfim=%d", buffer[fim].nomeProcesso[0], inicio, fim);
  fim = novoFinal;
  printf("novoFinal=%d", fim);
}

void removerElemento()
{

  printf("\n fim=%d inicio=%d", fim, inicio);
  if (inicio != fim)
  {
    Buffer removido = buffer[inicio];
    inicio = proximaPosicao(inicio);

    // return removido->nomeProcesso[0];
    printf("\n\nRemoveu %c!", removido.nomeProcesso[0]);
    return;
  }

  printf("\n\nFila vazia!");
}
