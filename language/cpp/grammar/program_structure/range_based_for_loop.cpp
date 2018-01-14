#include <iostream>
#include <string>
using namespace std;
int main()
{
    string str = "Hello, world!";
    for (char c : str)
        cout << '[' << c << ']';
    cout << endl;
    return 0;
}