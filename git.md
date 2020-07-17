# git이란?

- git은 '버전을 관리하는 도구'이다.
- git을 활용하면 '작업하던 파일'이 망했을 때, 이전 버전으로 돌아가는 것이 수월하다.
- git은 단순한 파일 저장 방식이 아니라, Working directory / Stage / Github 순으로 파일에 대한 저장 작업이 이루어진다.







# git의 작업 흐름

1. add: Working directory에 있는 파일을 '커밋할 목록'에 추가하는 명령어이다.
2. commit: add한 파일들을 github에 올리기 직전, 즉 Stage에 쌓는 명령어이다. commit에는 어떤 파일을 추가했는지, 어떤 작업을 했는지에 대한 '설명'을 추가할 수 있다.
3. push: 쌓아놓은 파일들(commit한 파일들)을 원격 저장소인 github에 올리는 명령어이다. git push를 실행하면 git remote로 연결된 github 주소의 repository(저장소)에 쌓아놓은 파일들이 저장된다.

