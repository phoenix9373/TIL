# git branch

> 0918_TIL_git_branch



## 개념

- 나뭇가지 혹은 분기점 이라는 의미로 코드의 분기를 의미함.



## 확인

- `git branch`



## 로그 확인

- `git log --oneline`
- `git log --all --oneline`: 현재 master에 추가되지 않은 branch까지 보여준다.
- `git log --all --oneline --graph`: 위의 명령어에 나뭇가지 모양으로 log를 보여준다.



## 생성

- `git branch <new branch name>`
- `branch` name은 대게 기능, 버전 등을 표현하는 방식으로 네이밍한다.



## 이동

- `git switch <branch name>`



## 삭제

- `git branch -d <branch name>`



## 병합(master + branch)

- master를 `HEAD` 기준으로 원하는 branch를 master에 병합함.
- `git merge <branch name>`



## 병합 종류

- fast-forward: branch가 **추가된 내용 이외에 master와 완전 동일**할 때, master에 branch에서 추가된 내용만 병합한다.
- recursive strategy: master와 branch에 **각각 내용을 추가, 수정했지만 서로 다른 부분에 대해 작업한 경우**, 즉 서로 충돌이 일어날 부분이 없는 경우 알아서 병합한다.



## 병합 충돌(Conflict)

- master와 branch에 각각 내용을 추가 또는 수정했을 때,
- 충돌한 내용을 직접 수정해서 반영한다.
- 반영할 내용을 두고, '<<<, ===, >>>'와 삭제할 내용을 제거하면 된다.

```python
# 예시

<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<master에서 수정한 내용, 발신>
============================
<branch에서 수정한 내용, 수신>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>
```

