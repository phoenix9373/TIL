# 0721_workshop



### 1. 간단한 N의 약수

```python
number = int(input())

prop_div_lst = []

for i in range(number):
    if (number % i) == 0:
        prop_div_lst.append(i)
        
prop_div_lst.sort()
print(prop_div_lst)
```







### 2. 중간값 찾기

```python
numbers = list(map(int, input().split())) # 입력 예시: 1 39 47 18 40 ...

numbers.sort()

median_idx = round(len(numbers)/2)

print(numbers[median_idx])
```





### 3.  계단 만들기

```python
number = int(input())

for i in range(1, number + 1):
    lst = [j for j in range(1, i + 1)]
    
    for num in lst:
        print(num, end=' ')
        
    print(' ')
```



### 4. 구구단을 외자, 구구단을 외자 2 X 1 ?!

```python
for i in range(2, 10):
    print(f'-------- [{i}단] --------')
    for j in range(1, 10):
        print(f'{i} X {j} = {i*j}')
```



