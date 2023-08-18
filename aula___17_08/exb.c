#include <stdio.h>
#include <stdlib.h>

struct Pessoa
{
  int idade;
  float peso;
  float altura;
};

int main()
{
  struct Pessoa Pessoas[5];

  int i;
  for (i = 0; i < 5; i++)
  {
    printf("\r\nidade da pessoa %i: ", i + 1);
    scanf("%i", &Pessoas[i].idade);

    printf("\r\npeso da pessoa %i: ", i + 1);
    scanf("%f", &Pessoas[i].peso);

    printf("\r\naltura da pessoa %i: ", i + 1);
    scanf("%f", &Pessoas[i].altura);
  }

  for (i = 0; i < 5; i++)
  {
    printf("\r\nPessoa %i tem %i anos, %f de peso e %f de altura", i + 1, Pessoas[i].idade, Pessoas[i].peso, Pessoas[i].altura);
  }

  return 0;
}