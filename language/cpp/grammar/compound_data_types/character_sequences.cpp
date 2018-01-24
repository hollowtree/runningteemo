#include <iostream>

using namespace std;

int main()
{
    // character sequences 表示的字符串的结尾由一个空字符`\0`表示
    // 故尽管 "Hello, World!" 的长度为13，但申请的 character sequences 长度必须大于等于14才能放得下这个字符串
    char foo[14] = "Hello, World!";
    cout << foo << endl;
    return 0;
}