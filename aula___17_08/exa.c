#include <stdio.h>

struct PersonBlessed
{
    float weight;
    float height;
    int age;
};

int main()
{
    struct PersonBlessed professorLucas;
    int canContinue = 0;

    do
    {
        printf("\nIdade: ");
        scanf("%d", &professorLucas.age);

        if (professorLucas.age > 0)
        {
            canContinue = 1;
        }
        else
        {
            printf("\nA idade deve ser maior que 0\n\n");
        }
    } while (canContinue == 0);

    canContinue = 0;

    do
    {
        printf("\nAltura: ");
        scanf("%f", &professorLucas.height);

        if (professorLucas.height > 0)
        {
            canContinue = 1;
        }
        else
        {
            printf("\nA altura deve ser maior que 0\n\n");
        }
    } while (canContinue == 0);

    canContinue = 0;

    do
    {
        printf("\nPeso: ");
        scanf("%f", &professorLucas.weight);

        if (professorLucas.weight > 0)
        {
            canContinue = 1;
        }
        else
        {
            printf("\nO peso deve ser maior que 0\n\n");
        }
    } while (canContinue == 0);

    printf("\n\nIdade:%d \nAltura:%.2f \nPeso:%.2f \n", professorLucas.age, professorLucas.height, professorLucas.weight);

    return 0;
}