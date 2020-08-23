> 0821_TIL





# Python 가상환경 생성



### 가상환경이란?

- 가상환경은 기존의 **시스템 Python**의 환경과 독립된 환경을 의미한다.
- 시스템 Python은 Global 환경에서 이루어지며, `pip`을 통한 모든 라이브러리가 이 곳에 설치된다.
- 가상환경은 라이브러리, 즉 패키지마다 필요한 버전들을 독립된 환경에서 관리하기 위한 공간이다.



### 생성 방법

- 생성: `python -m venv {가상환경이름}`
- 실행: `source {폴더명}/Scripts/activate`
- 종료: `deactivate`



### VScode Interpreter 설정

>  가상환경을 만든 후, vscode에서 작업하기 위해서는 원하는 환경을 선택해야한다.

- `Ctrl+Shift+P`를 통해 'interpreter'를 검색하면 python interpreter 설정이 나온다.
- 설정을 누르면, 현재 컴퓨터에 설치되어있는 python 환경을 선택할 수 있다.
- 여기서 직접 만든 가상환경 `venv`를 클릭하면 bash 창에 자동으로 가상환경을 실행(`source ~~`)시킨다.



### django-admin startproject {프로젝트 이름} .

- 위 명령어에서 `.`을 마지막에 붙여주면 현재 폴더에 프로젝트 폴더에 담긴 파일 및 폴더를 만든다.
- 가상환경에서 django를 활용해 만든 프로젝트는 반드시 가상환경에 먼저 django를 설치한 후 진행해야한다. 현재는 글로벌 환경에서 django를 가져다 쓴 것.



### git으로 프로젝트 관리

- 올리지 말아야 할 것
  - `.vscode/`: vscode에서 임시적으로 관리하는 파일들.
  - `db.sqlite3`: 개인 DB이기 때문에 반드시 올리지 않도록 한다.
  - `venv`: 환경 설정 파일이고, 용량이 큰 파일. 버전 관리의 목적과 부합하지 않는 파일



- [gitignore](https://www.toptal.com/developers/gitignore) 에서 운영체제, 개발환경 등을 고려한 `.gitignore` 파일을 만들어보자.
- 자동완성을 활용하여 다음과 같은 순서 등으로 올린다.
  - 운영체제: Windows, MacOS
  - 개발환경: VisualStudioCode
  - 언어: Python
  - 프레임워크: Dajngo
  - 가상환경: venv



- gitignore를 추가한 이후에 `git add .`을 해주자!!



### 패키지 관리

`pip freeze`

- 현재 환경에 설치된 패키지를 requirements format으로 출력
- 각 패키지들은 대소문자를 구분하지 않는 순서로 나열



패키지 요구사항 파일 생성

- `pip freeze > requirements.txt`
- CLI 명령어. `>`는 어떤 곳으로 보낸다는 의미.
- 프로젝트를 위한 repo를 생성한 후, 위 명령어를 통해 생성되는 txt 파일을 함께 첨부하면 해당 파일 내에 있는 패키지 정보를 바탕으로 가상환경 위에 동일한 환경을 만들 수 있다.



패키지 요구사항 설치

- `pip install -r requirements.txt`
- `-r`은 requirements의 약자.



### 프로젝트 DB

---

#### fixture

- Django가 데이터베이스로 import 할 수 있는 데이터 모음

- 앱을 처음 설정할 때 데이터베이스를 미리 채워야하는 상황에서 초기 데이터를 제공하는 방법 중 하나.



**Dump, Load**

- dumpdata
  - 특정 앱의 관련된 데이터베이스의 모든 데이터를 출력
  - 명령어: `python manage.py dumpdata app_name.ModelName [--options]`
  - 예시:  `python manage.py dumpdata articles.Article --indent 4 > articles.json`
  - `> {파일명}`은 만든 데이터를 {파일명} 파일에 저장한다.



- loaddata
  - dumpdata를 통해 만들어진 fixtures 파일을 데이터베이스에 import
  - fixtures 파일은 반드시 app 디렉토리 안에 fixtures 디렉토리 위치.
  - `app/fixtures/{fixture 파일}`
  - 명령어: `python manage.py loaddata fixtures_path`
  - 예시: `python manage.py loaddata articles/articles.json`



- 초기 데이터 준비
  - dumpdata를 활용하여 초기 데이터를 만들고, user 정보 또한 만들 수 있다.
  - 명령어: `python manage.py dumpdata auth.User --index 4 > users.json`
  - 준비가 되었으면, app 이름 내에 `fixtures/{앱이름}`(namespace 고려) 폴더를 이중 생성하고 json 파일을 넣는다.
  - 그 다음, 같이 push를 해주면 된다.



- 다른 컴퓨터에서 위에서 설정한 환경을 가져올 때.
  - `venv`와 `db` 모두 없는 상태. (venv는 requirements.txt로 구축.)
  - 두 개의 json 파일 모두 불러오기
    - `python manage.py loaddata articles/articles.json articles/users.json` 
    - dumpdata도 마찬가지로 앱이름.모델이름 앱이름2.모델이름2 > 파일이름 파일이름2 처럼 2개를 동시에 생성 가능하다.