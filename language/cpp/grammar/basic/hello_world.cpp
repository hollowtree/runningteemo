#include <iostream>
#include <string>

using namespace std;

int main()
{
    // Several string literals can be concatenated to form a single string literal simply by separating them by one or more blank spaces, including tabs, newlines, and other valid blank characters. 
    const string str = "Hello"" World!\t"
    "Hello"" World!";
    cout << str << endl;
}