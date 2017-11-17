#include <iostream>

using namespace std;

int main()
{
    int a, b;
    cout << "a = ";
    cin >> a;
    cout << "b = ";
    cin >> b;
    cout << "(++a) - b = " << ++a - b << "\n";
    cout << "(a++) - b = " << a++ - b;
    return 0;
}