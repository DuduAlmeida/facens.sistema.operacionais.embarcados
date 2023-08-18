#include <stdio.h>
#include <stdlib.h>

struct Pessoa
{
  int idade;
  float peso;
  float altura;
};

void preenchePessoa(struct Pessoa *Pessoa1, int idade, float peso, float altura)
{
  Pessoa1->idade = idade;
  Pessoa1->peso = peso;
  Pessoa1->altura = altura;
};

int main()
{
  struct Pessoa Pessoas[5];

  int i;
  int idade;
  float peso, altura;
  for (i = 0; i < 5; i++)
  {
    printf("\r\nIdade da pessoa %i: ", i + 1);
    scanf("%i", &idade);

    printf("\r\nPeso da pessoa %i: ", i + 1);
    scanf("%f", &peso);

    printf("\r\nAltura da pessoa %i: ", i + 1);
    scanf("%f", &altura);

    preenchePessoa(&Pessoas[i], idade, peso, altura);
  }

  for (i = 0; i < 5; i++)
  {
    printf("\r\nPessoa %i tem %i anos, %f de peso e %f de altura", i + 1, Pessoas[i].idade, Pessoas[i].peso, Pessoas[i].altura);
  }

  return 0;
}