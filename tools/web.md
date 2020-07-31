# 웹에 대하여

- 웹은 사용자 / 브라우저 / 서버로 구성된다.
- 사용자가 `request`(요청)을 하면 우리가 사용하는 `브라우저`(크롬 등)는 해당 `server`에 사용자가 입력한 요청을 보낸다.
- 요청을 받은 `브라우저`는  `server`가 보낸 `response`를 다시 사용자에게 돌려준다. 



# requests 모듈 사용법

- 먼저 requests 모듈을 `import` 해야한다.



```python
# 아래 코드를 통해 requests 라이브러리를 가져오자.
import requests

url = "접근하고자 하는 url"

# requests 모듈이 해당 url에 '요청'을 보내고, 응답받은 내용을 response 변수에 저장한다.
response = requests.get(url)

# response에 저장된 내용을 보면,
print(response.text)

# --- 너무 길어서 간략히 설명하면 해당 웹사이트의 내용을 'html' 형식의 텍스트로 저장되어 있다.
```



# beautifulSoup 모듈 사용법

- 먼저 bs4 모듈을 `import` 해야한다.



```python
import bs4

# data라는 변수에 위에서 가져온 response 텍스트를 'html.parser'라는 parsing 기능으로 사용자가 보기 좋게 만든다.

data = bs4.BeautifulSoup(response, 'html.parser')

# 해당 웹페이지에 들어가서 parsing하고자 하는 부분을 '우클릭'하여 '검사' 버튼을 누르면
# 개발자 창이 켜지고, 해당하는 부분이 좌측의 하늘색 네모칸과 함께 보인다.

# 다시 하늘색 네모칸의 부분에 해당하는 코드를 우클릭 -> Copy -> Copy select를 누른 후 아래 코드를 실행한다.

select = data.select_one('붙여넣기')
print(select.text) # 파싱한 내용 중 text를 print한다.
```

