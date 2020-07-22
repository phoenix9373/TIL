# PEP-8 스타일이란?

> "Readability is everything"이라는 철학을 바탕으로 한 Python 코드 작성하는 방식입니다.
>
> 현업에서 다른 사람들과 원활하게 협업하기 위해 가장 무난하게 사용되는 스타일 중 하나입니다.



- PEP-8 스타일에는 많은 내용이 담겨있지만, 그 중에서 지켜야할 큰 부분만 보도록 하겠습니다. (전체 가이드는 [PEP-8 전체 가이드](https://www.python.org/dev/peps/pep-0008/) 참고)

- Python을 처음 시작하는 초보자에게 위 문서를 모두 보고 적용하는 것은 어렵지만, 어느 정도 숙달이 되었다면 반드시 '일관성'있는 코드 작성을 위해 정독하는 것을 추천합니다.



# Code Lay-out



### 1. 들여쓰기(Indentation)

- 들여쓰기는 `1 tab` 대신  `4 spaces`로 쓰는 습관을 들이는 것이 좋습니다.
- 연속된 문장에서 칸이 부족한 경우, 같은 레벨은 같은 `indentation level`을 유지합니다.
- 예시

```python
# Correct

foo = long_function_name(var_1, var_2,
                         var_3, var_4)

# Wrong

foo = long_function_name(var_1, var_2,
                     var_3, var_4)


# Correct

def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)
    
# Wrong

def long_function_name(
    var_one, var_two, var_three,
    var_four):
    print(var_one)
```



### 2. 리스트 or instances

- 가로줄이 긴 리스트나 어떤 객체의 인스턴스 인자가 많거나 긴 경우 다음과 같이 합니다.

- 예시

  ```python
  # 마지막 줄의 첫번째 인자에 맞춰서 마무리.
  
  my_list = [
      1, 2, 3,
      4, 5, 6,
      ]
  result = some_function_that_takes_arguments(
      'a', 'b', 'c',
      'd', 'e', 'f',
      )
  
  # 해당 객체를 선언한 줄과 동일하게 마무리.
  
  my_list = [
      1, 2, 3,
      4, 5, 6,
  ]
  result = some_function_that_takes_arguments(
      'a', 'b', 'c',
      'd', 'e', 'f',
  )
  ```



### 3. 최대 문장 길이

- 일반적으로 Python에서는 최대 한 줄의 길이를 79자 제한합니다.
- 문장 자체가 더 길 경우에는 `\`로 다음 줄과 이어서 할 수 있지만 추천하지는 않습니다.



### 4. 연산자의 위치

- 다양한 연산을 수행하게 할 때, 한 문장에 여러가지 연산자가 길게 쓰이는 경우가 있습니다.

- 이 경우, 연산자의 위치는 대게 다음 줄의 첫 글자가 됩니다.

- 예시

  ```python
  # Wrong case
  
  income = (gross_wages +
            taxable_interest +
            (dividends - qualified_dividends) -
            ira_deduction -
            student_loan_interest)
  
  # Correct case
  
  income = (gross_wages
            + taxable_interest
            + (dividends - qualified_dividends)
            - ira_deduction
            - student_loan_interest)
  ```



### 5. Blank lines

- 최상위 함수(Method 함수 제외)나 `Class`를 표현하는 경우에는 `Two blank lines`로 다른 함수들과 구분합니다.
- 또한, 일반적인 `method function`의 경우에는 `Single blank line`으로 구분합니다.



### 6. Imports

- 오픈 소스 라이브러리를 `import`할 때는 일반적으로 하나의 라이브러리당 하나의 라인입니다.

- 예시

  ```python
  # Correct
  import sys
  import os
  
  # Wrong
  import sys, os
  
  # -----
  
  # 아래의 경우는 하나의 라이브러리에 포함되므로 Correct.
  from subprocess import Popen, PIPE
  ```

- `sklearn`과 같이 `Ensemble`, `Metric` 등으로 나누어진 경우 각각 따로 `import`하는 것이 좋습니다.





# Whitespace in Expression and Statements

> 표현식과 주석에서 공백.

- 불필요한 공백 제거.

  ```python
  # Correct:
  spam(ham[1], {eggs: 2})
  
  # Wrong:
  spam( ham[ 1 ], { eggs: 2 } )
  ```



- 값 하나를 표현하는 리스트, 튜플 등에서 공백 제거.

  ```python
  # Correct:
  foo = (0,)
  
  # Wrong:
  bar = (0, )
  ```

  

- 특수 기호 바로 앞에서 공백 제거.

  ```python
  # Correct:
  if x == 4: print x, y; x, y = y, x
      
  # Wrong:
  if x == 4 : print x , y ; x , y = y , x
  ```

  

- 연산 기호와 함께 쓰일 때.

  ```python
  # Correct:
  # +, -는 공백 사용. *는 붙여서 사용.
  
  i = i + 1
  submitted += 1
  x = x*2 - 1
  hypot2 = x*x + y*y
  c = (a+b) * (a-b) # 괄호로 묶인 경우 제외.
  
  # Wrong:
  i=i+1
  submitted +=1
  x = x * 2 - 1
  hypot2 = x * x + y * y
  c = (a + b) * (a - b)
  ```

  

- 함수 annotation. # 함수 주석.

  ```python
  # Correct:
  def munge(input: AnyStr): ...
  def munge() -> PosInt: ...
      
  # Wrong:
  def munge(input:AnyStr): ...
  def munge()->PosInt: ...
  ```

  

- 함수 초깃값 설정.

  ```python
  # 공백의 차이만 보시면 됩니다.
  
  # Correct:
  def complex(real, imag=0.0):
      return magic(r=real, i=imag) # 붙여서 공백없이 사용.
  
  # Wrong:
  def complex(real, imag = 0.0):
      return magic(r = real, i = imag)
  
  # None의 경우 초깃값이더라도 공백 추가.
  
  # Correct:
  def munge(sep: AnyStr = None): ...
  def munge(input: AnyStr, sep: AnyStr = None, limit=1000): ...
      
  # Wrong:
  def munge(input: AnyStr=None): ...
  def munge(input: AnyStr, limit = 1000): ...
  ```

  



































