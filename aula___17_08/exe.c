#include <stdio.h>
#include <stdlib.h>

struct Funcionario
{
  char nome[50];
  int idade;
  float salario;
};

int main()
{
  struct Funcionario *pFuncionario;

  pFuncionario = (struct Funcionario *)malloc(sizeof(struct Funcionario));

  printf("Digite o nome do funcionário: ");
  scanf("%s", pFuncionario->nome);

  printf("Digite a idade do funcionário: ");
  scanf("%d", &pFuncionario->idade);

  printf("Digite o salário do funcionário: ");
  scanf("%f\n", &pFuncionario->salario);

  printf("Dados do funcionário:\n");
  printf("Nome: %s\n", pFuncionario->nome);
  printf("Idade: %d\n", pFuncionario->idade);
  printf("Salário: %f\n", pFuncionario->salario);

  free(pFuncionario);

  return 0;
}
