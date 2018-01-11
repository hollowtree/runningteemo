#include <iostream>
using namespace std;
int main()
{
    int a = 5, b = 5;
    // In the case that the increase operator is used as a prefix (++x) of the value, the expression evaluates to the final value of x, once it is already increased.
    cout << ++a << endl;
    // On the other hand, in case that it is used as a suffix (x++), the value is also increased, but the expression evaluates to the value that x had before being increased.
    cout << b++ << endl;
    return 0;
}