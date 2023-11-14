#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define poolsize 6
#define FAIL 0
#define SUCCESS 1
#define REPEAT 2

int head =0, tail = 0;

typedef char (*ptfunction)(void);

typedef struct Process
{
    ptfunction function;
    int period;  
    int start;
    int priority;
    char *nome;
    bool run;
} Process;

Process *pool[poolsize];

char f1();
char f2();
char f3();
char f4();
char f5();
char fNull();
char KernelAddProc(Process *process);
void KernelInit();
void KernelLoop();
void KernelClock();

int period = 0;

    Process proc1 = {f1, 1, 0,0,"f1",true};
    Process proc2 = {f2, 1, 0,1,"f2",true};
    Process proc3 = {f3, 1, 0,2,"f3",true};
    Process proc4 = {f4, 4, 0,0,"f4",true};
    Process proc5 = {f5, 5, 0,0,"f5",true};
    Process procNull = {fNull, 0, 0,0,"fNull",false};

int main()
{

    KernelInit();
    KernelAddProc(&proc5);
    KernelAddProc(&proc1);
    KernelAddProc(&proc2);
    KernelAddProc(&proc3);
    KernelAddProc(&proc4);
    
    KernelLoop();
    return 0;
}

void KernelInit()
{
    printf("\n KernelInit \n");
    Process procNull = {fNull, 0, 0, 0,"fNull"};

    int i;
    for(i=0;i<poolsize;i++)
    {
        pool[i] = &procNull;
    }
}

char KernelAddProc(Process *newproc)
{
    printf("\n KernelAddProc \n");
    if ((tail + 1) % poolsize != head)
    {
        pool[tail] = newproc;
        pool[tail]->start += newproc->period;
        tail = (tail + 1) % poolsize;
        return SUCCESS;
    }
    else return FAIL;
}

void KernelClock()
{
    //printf("\n Clock \n");
    int i = head;
    while (i != tail)
    {
        pool[i]->start -= 1;
        i = (i + 1) % poolsize;
    }
}

void KernelLoop()
{
    printf("\n Kernel Loop \n");
    while(1)
    {
        if (head != tail)
        {
            debugPrint();
            int next = head;
            int adj = (next + 1) % poolsize;

            int ordIndex =0;
            while (adj != tail)
            {
                if (pool[next]->start > pool[adj]->start || (pool[next]->start == pool[adj]->start && pool[next]->priority < pool[adj]->priority)){
                    ordIndex +=1;
                    next = adj;
                    
                }
                adj = (adj + 1) % poolsize;
            }
                
            Process *temp;
            temp = pool[next];
            pool[next] = pool[head];
            pool[head] = temp;

            if (pool[head]->start <= 0)
            {
                char ans = pool[head]->function();
                pool[head] = &procNull;
                printf("\n");
                if (ans == REPEAT)
                {
                    KernelAddProc(&proc5);
                    debugPrint();
                }
                head = (head + 1) % poolsize;
            }
        }
        KernelClock();
    }
}


char fNull()
{
    return SUCCESS;
}

char f1()
{
    printf("\n************");
    printf("Executou funcao 1");
    printf("**********\n");
    return SUCCESS;
}
char f2()
{
    printf("\n************");
    printf("Executou funcao 2");
    printf("**********\n");
    return SUCCESS;
}
char f3()
{
    printf("\n************");
    printf("Executou funcao 3");
    printf("**********\n");
    return SUCCESS;
}
char f4()
{
    printf("\n************");
    printf("Executou funcao 4");
    printf("**********\n");
    return SUCCESS;
}
char f5()
{
    printf("\n************");
    printf("Executou funcao 5");
    printf("**********\n");
    return SUCCESS;
}

void debugPrint(){
    printf("\n[head|tail]: [%d|%d]\n",head,tail);
    printf("================================================================================================");
    printf("\n nome \t | \t periodo \t | \t start \t | \t prioridade \t | \t executar? \t |\t");
    printf("\n________________________________");
    for (int i = 0; i < poolsize-1; i++)
    {
        printf("\n %s \t | \t %d \t \t | \t %d \t | \t %d \t \t | \t %d \t \t| \t", pool[i]->nome, pool[i]->period, pool[i]->start, pool[i]->priority, pool[i]->run);
    }
    printf("\n==============================================================================================");
    printf("\n");
    
}