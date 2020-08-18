> 0818_TIL



- 주의할 것
  - 논리, 수리 연산 등은 `views.py`에서 코드를 작성하고, 
  - `templates`에서는 '보여주기' 위한 코드를 작성하는 것이 좋다.



## urls.py

### urls

- 같은 project 내에서 서로 다른 앱에 대해 `urls.py`을 작성할 경우

  - 각각의 앱 내에 `urls.py`를 만들고 다음과 같이 작성한다.

  - ```python
    from django.urls import path # 공통
    from . import views # 자기가 현재 있는 위치에서 views를 불러온다.
    
    # urls.py 파일 안에 반드시 'urlpatterns'라는 이름과 동일한 url list 변수가 있어야한다.
    urlpatterns = [
        path('blarblar', views.blarblar)
    ]
    ```

  - 하지만 project 폴더에 있는 `urls.py`에는 조금 다르게 작성한다.

  - ```python
    from django.contrib import admin
    from django.urls import path, include # include가 추가되었다.
    
    # include는 해당 앱 폴더 안의 urls.py 폴더를 서브 urls로 활용하도록 하는 메서드이다.
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('articles/', include('articles.urls')),
        path('pages/', include('pages.urls')),
    ]
    ```



- 위와 같이 `urls.py`를 각각의 앱 내에 새로 생성하게 되면 접근할 수 있는 url 경로도 변경된다.
  - 예를 들어, `throw` url에서 보낸 데이터를 `catch`에서 받았는데 두 url 모두 `articles`의 아래 즉, `articles/throw`, `articles/catch`의 url로 접근해야 동작한다.

- django는 각각의 앱에서 `urls.py` 파일을 찾을 때, project의 `setting.py` 파일에서 앱을 등록시킨 순서대로 찾는다.
  - 따라서 앱 별로 `templates`가 따로 인식되도록 한다.
  - 먼저, 각각 앱의 `templates` 폴더 내에 해당 앱 이름의 폴더를 만든다.
  - 그 다음 `templates`에 있는 모든 파일을 해당 앱 이름의 폴더로 이동시킨다.



## Templates

- `setting.py`  파일 내에 `TEMPLATES` 변수가 가지는 APP_DIRS 속성이 `True`이면 자동으로 app별로 templates 폴더를 읽어온다.

- `setting.py` 파일 내에 `BASE_DIR` (해당 변수는 최상위 폴더의 경로를 의미한다. 프로젝트 폴더 `first_project`의 경로는 미포함) 외에 있는 `templates` 폴더를 추가하고 싶으면 `TEMPLATES` 변수의 `DIR` 속성에 경로를 추가한다.

  - ```python
    TEMPLATES = [
        {
            ... , 
            'DIRS': [BASE_DIR / 'first_project' / 'templates',], # 별도의 templates 폴더를 읽어오고 싶을 때.
            'APP_DIRS': True, # app별 templates 폴더를 읽어오는 속성.
        },
    ]
    
    ```

  - **주의: 리스트의 끝 항목에 반드시 `,`를 추가해주자.**



#### Templates/Block

- `first_project`와 같이 `setting.py`을 포함하는 프로젝트 폴더에 `templates` 폴더를 만들고 `base.html`을 만들어서 각 앱에 동일하게 적용할 디자인을 만들 수 있다.

- ```django
  # first_project/templates/base.html
  
  <head>
      {% block title %}
      {% endblock title %}
  </head>
  <body>
      {% comment %} content라는 블락 만들기 {% endcomment %}
      {% block content %}
      {% endblock content %}
  ```

- 위와 같이 작성을 해놓으면,

- ```django
  # pages/templates/pages/index.html
  
  # extends로 base.html의 형식을 가져오고,
  # 해당 html 파일 내에서 블록으로 설정한 부분을 여기서 직접 작성하고, 수정할 수 있다.
  {% extends 'base.html' %}
  
  # 첫번째 블록: 블록 이름 or ID는 'title'
  {% block title %}
  <title>This is title</title>
  {% endblock title %}
  
  # 두번째 블록.
  {% block content %}
  <h1>Block 안의 content</h1>
  {% endblock %}
  ```

  

### with 'a' tag

- `articles` 앱의 `catch.html`에서 url이 `articles/index`인 곳으로 이동하도록 `a 태그`를 생성.

- 해당 a 태그를 사용하면 다른 앱에 있는 index로 이동하는 경우가 생긴다.

- 이를 방지하기 위해 각각의 앱의 `urls.py` 파일에  `app_name={해당 앱 이름}`을 만든다.

- 이렇게 설정한 뒤에는 각각의 django.html 파일에서 `url`을 선언할 때, `{앱 이름}:{django.html 파일이름}`과 같이 선언해야 한다.

  - ```python
    # articles/urls.py
    
    # 추가
    app_name = 'articles'
    urlpatterns = [
        ...
    ]
    ```

  - ```django
    # ../catch.html
    
    # 예시
    <a href="{% url 'articles:index' %}">홈으로!</a>
    
    또는 
    
    # ../throw.html
    <form action="{% url 'articles:catch' %}" method="GET">
    ```