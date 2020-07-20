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

