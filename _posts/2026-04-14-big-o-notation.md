---
layout: post
title: Big O notation
tags: [algorithms]
---

`Big O` notation is a mathematical concept used in computer science to describe the efficiency of an algorithm, 
specifically its worst-case complexity in terms of time or space as the input size grows. It provides an upper 
bound on the growth rate of an algorithm's runtime or memory usage.

#### `O(1)` – Constant Time
The algorithm runs in the same amount of time regardless of input size.
> Example: Accessing an element in an array by index.

```python
def constant_time(arr):
    return arr[0]  # Accessing an element takes the same time regardless of array size
```

#### `O(log n)` – Logarithmic Time
The algorithm's time grows logarithmically with input size.
> Example: Binary search.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1
```

#### `O(n)` – Linear Time
The runtime scales directly with input size.
> Example: Iterating through an array.

```python
def scan_array(arr, target):
    for item in arr:
        if item == target:
            return True

    return False
```

#### `O(n log n)` – Linearithmic Time
Often seen in efficient sorting algorithms.
> Example: Merge sort, quicksort (average case).

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)
```

#### `O(n^2)` – Quadratic Time
The runtime grows as the square of the input size.
> Example: Nested loops, bubble sort.

```python
def quadratic_time(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            print(arr[i], arr[j])
```

#### `O(2^n)` – Exponential Time
The runtime doubles with each additional input element.
> Example: Recursive Fibonacci sequence.

```python
def recursive_fibonacci(n):
    if n <= 1:
        return n

    return recursive_fibonacci(n - 1) + recursive_fibonacci(n - 2)
```

#### `O(n!)` – Factorial Time
The worst-case scenario for highly inefficient algorithms.
> Example: Generating all permutations.

```python
def permutations(arr):
    if len(arr) == 0:
        return [[]]

    result = []
    for i in range(len(arr)):
        rest = arr[:i] + arr[i+1:]
        for perm in permutations(rest):
            result.append([arr[i]] + perm)

    return result
```
