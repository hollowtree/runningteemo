// 重载函数，函数的参数个数不同、或至少有一个参数的类型不一样
#include <iostream>
using namespace std;

int add(int a, int b)
{
    return a + b;
}
float add(float c, int d)
{
    return c + d;
}
int main()
{
    int a = 2, b = 3, d = 7;
    float c = 7.32534;
    cout << add(a, b) << endl;
    cout << add(c, d) << endl;
    return 0;
}