// stringstream
#include <iostream>
#include <sstream>

using namespace std;
int main()
{
    string str = "243.324";
    float num = 0;
    stringstream(str) >> num;
    cout << num << ' ' << endl;

    string mystr;
    float price = 0;
    getline(cin, mystr);
    stringstream(mystr) >> price;
    cout << price << endl;

    return 0;
}