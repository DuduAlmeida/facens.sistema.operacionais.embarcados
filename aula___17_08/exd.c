#include <stdio.h>

struct Pessoa
{
  int idade;
  float peso;
  float altura;
};

void definePessoa(struct Pessoa *pessoa);

int main()
{
  struct Pessoa Pessoa[20];

  int i;
  int max_pessoas;

  printf("Digite o numero de pessoas: ");
  scanf("%i", &max_pessoas);

  for (i = 0; i < max_pessoas; i++)
  {
    definePessoa(&Pessoa[i]);
  }

  for (i = 0; i < max_pessoas; i++)
  {
    printf("Pessoa %i", i);
    printf("%i\n", Pessoa[i].idade);
    printf("%f\n", Pessoa[i].peso);
    printf("%f\n\n", Pessoa[i].altura);
  }

  return 0;
}

void definePessoa(struct Pessoa *pessoa)
{
  printf("digite os dados da pessoa (idade, peso, altura):");
  scanf("%i", &pessoa->idade);
  scanf("%f", &pessoa->peso);
  scanf("%f", &pessoa->altura);
}
