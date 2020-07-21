# git이란?

>  git은 '버전을 관리하는 도구'이다. 다시 말해 '분산 버전 관리 시스템'

- git을 활용하면 '작업하던 파일'이 망했을 때, 이전 버전으로 돌아가는 것이 수월하다.
- git은 단순한 파일 저장 방식이 아니라, Working directory / Stage / Github 순으로 파일에 대한 저장 작업이 이루어진다.





## 준비하기

윈도우에서 git을 활용하기 위해서 [git bash](https://git-scm.com/downloads)를 설치합니다.

초기 설치를 완료한 이후에, 계정 설정을 진행합니다.

```sh
$ git config --global user.email {이메일주소}
$ git config --global user.name {유저네임}
```





## 로컬 저장소 활용하기

### 1. 저장소 초기화

> 의미: 이제부터 이 디렉토리를 git으로 관리하겠다. or 변경 이력을 감시하겠다.

```sh
$ git init
```

- `.git` 디렉토리가 생성되며, 여기에 git과 관련된 모든 정보가 저장됩니다.
- 초기화를 하고나면 git bash에 `(master)`라고 표시가 된다.
- 이는 '이 디렉토리는 이미 git이 관리하고 있다'는 뜻으로 생각할 수 있다. 
- 이미 초기화한 repository에서는 다시 `git init`을 하지 않는다.(master라는 표시가 있는지 항상 확인할 것.)



### 2. add

> working directory(작업공간) 에서 변경된 사항을 이력(log)로 관리하기 위해서 반드시 staging area를 거쳐야 한다.

```sh
$ git add {statging 할 파일} # 해당 파일만 staging
$ git add . # 모든 파일 staging
```



### 3. Commit

> 이력을 확정짓는, 즉 기록을 남기는 명령어이다.

```sh
$ git commit -m '커밋 메세지' # add된 파일을 commit한다.
$ git commit -a -m '커밋 메세지' # 모든 파일을 동시에 add하고 commit하는 방법.
```



커밋 기록을 확인하고 싶다면 아래의 명령어를 수행한다.

```sh
$ git log
```





### 4. Status

> git을 쓰면서 가장 많이 사용해야 하는 명령어. 현재 working directory와 stage, 그리고 commit 상황 등을 확인할 수 있다.

```sh
$ git status
```







## 원격 저장소 활용하기

>  여러 서비스 중, github를 기준으로 설명합니다.



### 1. 준비사항

- github에 회원가입 후, 빈 repository를 만들어둔다.



### 2. 원격 저장소 등록

- 로컬 저장소와 원격 저장소를 연결하는 일이다.

```sh
$ git remote add origin <github repository 주소 url>
```

- 해석하면 `<github repository 주소 url>`에 해당하는 저장소를 `origin`이라는 이름으로 '원격 저장소'를 등록한다는 의미이다.



- 원격 저장소 등록 현황을 확인하려면 아래의 명령어를 참고하세요.

```sh
$ git remote -v
```



### 3. 원격 저장소에 업로드

- 아래의 명령어를 통해 원격 저장소에 commit된 코드를 업로드할 수 있습니다.

```sh
$ git push origin master
```



### 4. 원격 저장소에서 로컬로 가져오기

- github이나 gitlab의 repository 주소를 복사한 후,

```sh
$ git clone {가져오고자 하는 repository url - .git으로 끝나야함.}
```



### 5. 











# git의 작업 흐름

1. add 
   - Working directory에 있는 파일을 '커밋할 목록'에 추가하는 명령어이다.
2. commit
   - add한 파일들을 github에 올리기 직전, 즉 Stage에 쌓는 명령어이다. 
   - commit에는 어떤 파일을 추가했는지, 어떤 작업을 했는지에 대한 '설명'을 추가할 수 있다.
3. push 
   - 쌓아놓은 파일들(commit한 파일들)을 원격 저장소인 github에 올리는 명령어이다. 
   - git push를 실행하면 git remote로 연결된 github 주소의 repository(저장소)에 쌓아놓은 파일들이 저장된다.





# git bash 설명

- git을 사전에 설치하셨다면 버전 관리를 원하는 폴더에서 `우클릭`을 하면 `git bash`를 실행시킬 수 있습니다.
- git bash는 git으로 버전관리를 할 때 사용하는 프롬프트 창이라고 생각하시면 됩니다.
- 주요 명령어
  - `git init`
    -  해당 폴더를 git으로 관리하기 위해 최초로 입력하는 명령어입니다. 
    - 이 명령어를 입력하면 `.git` 폴더가 자동적으로 생성됩니다. 
    - 이 폴더는 `git` 명령어를 모아놓은 폴더라고 생각하시면 됩니다. 
    - 추후에 나올 `git clone url`을 하시면 자동적으로 `.git`이 생성됩니다.
  - `git config` 설정
    - `git config --global user.email 사용자 이메일`으로 git에게 현재 사용하고 있는 사람이 누구인지 알려주는(설정) 명령어입니다. 
    - 저 같은 경우 `git config --global user.email phoenix9373@naver.com`로 github 계정 가입할 때의 이메일을 넣었습니다.
  - `git add <파일 이름>`
    - `commit` 하기 전에 `Stage`에 올려두는 명령어입니다.
  - `git remote add origin 'git 주소'`
    - 원격 저장소 중에 하나로 입력한 'git 주소'를 `origin`이라는 이름으로 추가하겠다는 의미입니다.
  - `git push origin master`
    - `origin`이라는 원격 저장소에 현재 사용자인 `master`가 한 작업을 반영(`push`)하겠다는 의미입니다. 





# git의 활용 순서



### 1. git 생성

- 먼저 git을 통한 버전 관리를 하고자 하는 폴더를 '작업 폴더(working directory)'라고 하자.
- 해당 폴더에 가서 git을 이미 설치했다면, 우클릭을 통해 'git bash'라는 탭을 볼 수 있을 것이다. 클릭하자.
- 그 다음, git을 활용하기 위해 가장 먼저 해야하는 것은 `git init` 또는 `git clone <github url>`이다.
- 만약 github에 이미 repository가 있고, 몇 가지 파일이 있다면 가장 먼저 `git clone <github url>`로 가져오자.
- 없다면 `git init`을 통해 '.git' 폴더가 생성되는지 확인하자.



### 2. git 환경설정

- 만약 git을 처음 사용한다면 `git config`를 통해 사용자 이름과 이메일을 등록해주자.
- `git config --global user.name <user.name>`으로 `commit` 시에 누가 커밋을 했는지 알 수 있다.
- `git config --global user.email <user.email>` 도 마찬가지로 커밋한 사람의 이메일 정보를 알 수 있도록 한다.



### 3. git add

- 먼저  `git status`를 하면 현재 commit 되지 않은 파일들이 나온다.
- `commit`을 하기 위해 먼저 `git add <파일명> or <.>`으로 특정 파일 또는 모든 파일을 staging하도록 한다.



### 4. git commit

- 다시 `git status`를 하면 초록색 글씨로 파일명이 나타나는 것을 확인할 수 있다.
- 이 상태에서 `git commit -m 'commit 메세지'`를 수행하면 commit 작업이 완료된다.
- 다시 한 번 `git status`로 commit한 내용이 다 반영되고 commit할 내역이 없는지 확인한 후, 없다면 성공이다.



### 5. git remote and git push

- `git clone`을 했다면 이미 github의 해당 repository와 연결이 되었겠지만 그렇지 않은 경우 따로 remote 저장소를 추가해야한다.
- `git remote add origin <github repository 주소>`를 입력한다.
- 해석하면 해당 주소를 origin 이라는 이름의 원격 저장소로 등록하겠다는 의미이다.
- 등록이 끝났다면 `git push -u origin master`를 수행하자.
- 해석하면 `master`라는 branch가 수행한 commit 내역을 원격 저장소인 `origin`에게 보낸다는 의미이다.