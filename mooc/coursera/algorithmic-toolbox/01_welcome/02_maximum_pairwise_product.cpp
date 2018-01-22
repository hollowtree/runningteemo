// --- problem:
// --- Given a sequence of non-negative integers A[0], …, A[n-1], find the maximum pairwise product, that is, the largest integer that can be obtained by multiplying two different elements from the sequence (or, more formally, max = A[i] * A[j], 0 ≤ i ≠ j ≤ n−1). Different elements here mean A[i] and A[j] with i ≠ j (it can be the case that A[i] = A[j]).

// --- 数列A，有 n (2 <= n <= 200000) 项，每一项 A[n] (0 <= A[n] <= 100000), 任意 0 ≤ i ≠ j ≤ n−1， 求 A[i] * A[j] 能得到的最大值 max

#include <iostream>
using namespace std;

int MaxPairwiseProduct(int a[])
{
    int temp = sizeof(a);
    cout << temp << ' ' << *a << &a << endl;
    return 90;
}

int main()
{
    int n;
    cin >> n;
    int arr[n];
    for (int i = 0; i < n; i++)
    {
        cin >> arr[i];
    }

    // int result = MaxPairwiseProduct(arr);
    // cout << result << endl;
    return 0;
}