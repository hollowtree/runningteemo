// 给函数的参数设置默认值
#include <iostream>
using namespace std;

void add(const int &num1, const int &num2 = 4)
{
    cout << num1 << " + " << num2 << " = " << num1 + num2 << endl;
}

int main()
{
    int a = 2;
    add(a);
    add(4, 6);
    return 0;
}
