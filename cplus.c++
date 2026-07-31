int a = 7;
int y = 3;
printf("%d and %d", x / y, x % y);
//Explanation: 7/3 = 2, 7%3 = 1

int x=1,y=3,z=3;
if((x==1) | (y==z) !! (z==2))
    printf("Yes");
else
    printf("No");
// Yes bcz Explanation: Y==z is true (3==3), so condition is true

Int c = 2
Do
  printf("%d", C);
While (c <= 5);
// output
// 2 2 2 2 ... (Infinite loop) Explanation: C is never incremented

int m=0, n=5;
if(m%n>1)
    printf("success");
else
    printf("Failure");

    // Failure Explanation: 0%5 = 0, 0>1 is false

int x=15;
int y=5;
printf("%d \t %d", x%y, x/y);

// 0    3 Explanation: 15%5=0, 15/5=3, \t gives tab space

int x=10, y=20, z=30;
x=x+y;
y=y+z;
z=x-y;
printf("result=%d%d%d", x,y,z);

// result=30 50 -20

int n=1;
while(n<6)
{
    printf("\n num=%d", num);
    n+1;
}
// Infinite loop (n never changes)

void main()
{
    printf("How |t are | t you");
    printf("|\n Bye");
}
// How    are    you
// Bye
// Explanation: \t = tab, \n = new line


// Find error fom these programs
Void main ()
{
    Int c = 7        ← Error 1: missing semicolon
    Print f ("%d", C);  ← Error 2: space in printf, C should be c
}
// correct
void main()
{
    int c = 7;
    printf("%d", c);
}

void main ()
{
    int x = 5;
    int y        ← Error 1: y not initialized
    sum = x + y  ← Error 2: sum not declared, missing semicolon
    printf("%d", sum);
}
// correct
void main()
{
    int x = 5;
    int y = 0;
    int sum = x + y;
    printf("%d", sum);
}

int P=20
if(P >= 5)    ← Error 1: missing semicolon after P=20
printf("OK"); ← Error 2: missing # include<stdio.h>
// correct
#include<stdio.h>
void main()
{
    int P = 20;
    if(P >= 5)
        printf("OK");
}

include <stdio.h>    ← Error 1: missing #
void main (void)
{
    int x=3
    printf("%d", x);  ← Error 2: missing semicolon after x=3
}
// correct
#include<stdio.h>
void main()
{
    int x = 3;
    printf("%d", x);
}
# Include <stdio.h>   ← Error 1: Include should be include
void Main()           ← Error 2: Main should be main
{
    int x,y;
    x=10; y=20;
    printf("%d%d", x,y,);  ← Error 3: extra comma
}
// correct
#include<stdio.h>
void main()
{
    int x, y;
    x=10; y=20;
    printf("%d%d", x, y);
}

void main()
{
    Far(int n=1; n<=5, n++)  ← Error 1: Far should be for
    printf("%d", n);          ← Error 2: comma should be semicolon
}
// correct
void main()
{
    for(int n=1; n<=5; n++)
        printf("%d", n);
}

// ⭐⭐⭐ 4. NESTED LOOP
// Definition:

// A loop inside another loop is called a Nested Loop.
// The inner loop executes completely for each iteration of the outer loop.
for(int i=1; 1<=5; i++) // outer loop
{
for(int J=1;J<=10;J++) //inner loop
{
printf("%d %d\n", i,J)
}
}
//output
// 1 1
// 1 2
// 1 3
// 2 1
// 2 2
// 2 3
// 3 1
// 3 2
// 3 3


#include<studio.h>
void main(){
    int i,j;
    for(i=1; i<=5; i++){
        for(j=1; j<=i; j++){
            printf("* ");
        }
        printf("\n")
    }
}
//output
// *
// * *
// * * *
// * * * *
// * * * * *

// If you don't want scanf() yet:
#include <stdio.h>

int main()
{
    float sum = 0;

    sum = sum + 1.0/1;
    sum = sum + 1.0/2;
    sum = sum + 1.0/3;
    sum = sum + 1.0/4;

    printf("%f", sum);

    return 0;
}
// 1 + 1/2 + 1/3 + 1/4

// with scanf
#include <stdio.h>

int main()
{
    int n, i;
    float sum = 0;

    printf("Enter n: ");
    scanf("%d", &n);

    for(i = 1; i <= n; i++)
    {
        sum = sum + 1.0 / i;
    }

    printf("Answer = %f", sum);

    return 0;
}
