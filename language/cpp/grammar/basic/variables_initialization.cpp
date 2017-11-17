#include <iostream>
using namespace std;

// define 精确度有限，定义 PI 为3.141592654时，无法打印出来
#define PI 3.14159

int main()
{
    int x = 1;
    int y(2);
    decltype(y) z{3};
    cout << "x = " << x << endl;
    cout << "y = " << y << endl;
    cout << "z = " << z << endl;
    cout << "PI = " << PI << endl;
}