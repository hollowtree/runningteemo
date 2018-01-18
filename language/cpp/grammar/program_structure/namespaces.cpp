// 命名空间
#include <iostream>

using namespace std;

namespace temp
{
int a = 2, b = 4;
}

int main()
{
    cout << temp::a << ' ' << temp::b << endl;
    return 0;
}