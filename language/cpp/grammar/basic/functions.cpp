#include <iostream>

using namespace std;

// 没有声明提升，使用函数之前必须先声明函数
void duplicate(int &a, int &b, int &c)
{
    a *= 2;
    b *= 2;
    c *= 2;
}
// 参数 设置默认值
int mul(int a, int b = 4)
{
    return a * b;
}

int main()
{
    int x = 1, y = 3, z = 7;
    duplicate(x, y, z);
    cout << "x = " << x << "\ny = " << y << "\nz = " << z << endl;
    cout << "2 * 3 = " << mul(2, 3) << endl;
    cout << "5 * 4 = " << mul(5) << endl;
    return 0;
}