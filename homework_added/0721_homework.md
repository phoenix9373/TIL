# 0721_homework

### 1. Mutable & Immutable

- Mutable
  - Set
  - List
  - Dictionary
- Immutable
  - Tuple
  - String
  - Range





### 2. 홀수만 담기

```python
lst = [i for i in range(1, 51)][0:-1:2]
```





### 3. Dictionary 만들기

```python
names_age = {'이동훈': 21, '김선재': 22, '박승범': 23, '박성준': 24, '유진우': 20}
```



### 4. 반복문으로 네모 출력

```python
n = 5
m = 9

for i in range(m):
    print('*'*n)
```



### 5. 조건 표현식

```python
temp = 36.5

result = '입실 가능' if temp < 36.5 else '입실 불가'

print(result)
```



### 6. 평균 구하기

```python
scores = [80, 89, 99, 83]
sum = 0

for i in scores:
    sum += i
    
print(sum/len(sum))
```

