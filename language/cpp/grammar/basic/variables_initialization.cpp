#include <iostream>
#include <string>
using namespace std;

// define 精确度有限，定义 PI 为3.141592654时，无法打印出来
#define PI 3.14159

int main()
{
    // c-like initialization
    int x = 1;
    // constructor initialization，将初始值用圆括号括起来
    int y(2);
    // uniform initialization，将初始值用大括号括起来
    decltype(y) z{3};
    auto a = x;
    string str{"Hello, world!"};
    cout << "x = " << x << endl;
    cout << "y = " << y << endl;
    cout << "z = " << z << endl;
    cout << "PI = " << PI << endl;
    cout << str << endl;
}