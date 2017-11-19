#include <iostream>
#include <string>
using namespace std;

int main()
{
    string mystr;
    cout << "what's your name? ";
    getline(cin, mystr);
    cout << "hello " << mystr << "." << endl;
    cout << "what's your favorite team? ";
    getline(cin, mystr);
    cout << "I like " << mystr << " too!" << endl;
    return 0;
}