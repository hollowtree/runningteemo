#include <iostream>
using namespace std;
void temp(int &pointNum1, int num2)
{
    cout << "pointNum1: " << pointNum1 << " num2: " << num2 << endl;
    cout << &pointNum1 << ' ' << &num2 << endl;
    pointNum1 *= 2;
    num2 *= 2;
}
int main()
{
    int a = 100, b = 90;
    int *pointA = &a, *pointB = &b;
    temp(a, b);
    cout << "a: " << a << " b: " << b << endl;
    cout << "a'size: " << sizeof(a) << endl;
    cout << "pointA: " << &pointA << " pointB: " << &pointB << endl;
    return 0;
}
