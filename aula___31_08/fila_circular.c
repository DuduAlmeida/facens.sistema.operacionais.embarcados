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

Buffer fila[MAX_BUFFER];

int movimenta_posicao(int posicao);
void inserir_fila(char *nomeProcesso, int memoriaAloc, float tempoExec);
void remover_fila();

int main()
{
  remover_fila();
  inserir_fila("1", 128, 1.32);
  inserir_fila("2", 128, 1.32);
  inserir_fila("3", 128, 1.32);
  inserir_fila("4", 128, 1.32);
  inserir_fila("5", 128, 1.32);
  inserir_fila("6", 128, 1.32); // erro

  printf("\n\n\nRemover os adicionados:\n\n\n");

  remover_fila(); //"1"
  remover_fila(); //"2"
  remover_fila(); //"3"
  remover_fila(); //"4"
  remover_fila(); //"5"
  remover_fila(); // erro

  return 0;
}

int movimenta_posicao(int posicao)
{
  return (posicao + 1) % (MAX_BUFFER + 1);
}

void inserir_fila(char *nome_processo, int memoria_aloc, float tempo_exec)
{
  int novoFinal = movimenta_posicao(fim);

  if ((novoFinal) == inicio)
  {
    printf("\n\nFila cheia!");
    return;
  }

  fila[fim].nomeProcesso = nome_processo;
  fila[fim].memoriaAloc = memoria_aloc;
  fila[fim].tempoExec = tempo_exec;

  // printf("\nValor adicionado na fila:\n\r %c\n\r %d\n\r%.2f",fila[fim].nomeProcesso[0],fila[fim].memoriaAloc,fila[fim].tempoExec = tempo_exec);
  printf("\n\nValor adicionado na fila:\n %c  \ninicio=%d\nfim=%d", fila[fim].nomeProcesso[0], inicio, fim);
  fim = novoFinal;
  printf("novoFinal=%d", fim);
}

void remover_fila()
{

  printf("\n fim=%d inicio=%d", fim, inicio);
  if (inicio != fim)
  {
    Buffer removido = fila[inicio];
    inicio = movimenta_posicao(inicio);

    // return removido->nomeProcesso[0];
    printf("\n\nRemoveu %c!", removido.nomeProcesso[0]);
    return;
  }

  printf("\n\nFila vazia!");
}