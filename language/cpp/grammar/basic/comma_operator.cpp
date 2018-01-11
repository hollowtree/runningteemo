#include <iostream>
using namespace std;
int main()
{
    int a;
    int b = (a = 4, a + 9);
    cout << a << ' ' << b << endl;
    return 0;
}