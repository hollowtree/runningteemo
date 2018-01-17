#include <iostream>
using namespace std;

template <class T>
T sum(T a, T b)
{
    T result;
    result = a + b;
    return result;
}

int main()
{
    int i = 5, j = 6, k;
    double f = 2.0, g = 0.5, h;
    // k = sum<int>(i, j);
    // h = sum<double>(f, g);
    // --- 简写：
    // 编译器能够自动推断出数据类型T
    // 但是如果sum使用不同类型的参数调用，则编译器可能会无法自动推断出类型T
    k = sum(j, j);
    h = sum(f, g);
    cout << k << endl;
    cout << h << endl;
    return 0;
}