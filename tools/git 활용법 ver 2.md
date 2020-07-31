# git 활용법 ver 2.







### 1. `git diff`

- working directory와 staging area의 차이를 보여준다.
- 즉, commit을 하기 이전과 commit을 한 후의 차이를 보여준다.



### 2. `git log`

- `--oneline` 옵션을 추가하면, git commit 기록을 한 눈에 볼 수 있다.

```sh
$ git log --oneline
977a339 (HEAD -> master, origin/master, origin/HEAD) [add] all
31fd86a [solve] 1983
fbdd9d4 [swea] d2_problem
(base)
```



### 3. `git restore` ==  `git reset`

- staging area에 있는 파일을 working directory로 내린다.
- 또는 working directory에 있는 파일을 untracked file로 내린다.





### 4. .gitignore

- `git`으로 꼭 관리하지 않아도 될 파일들을 `.gitignore` 파일에 저장해놓으면, 자동으로 `git`이 해당 파일을 관리하지 않는다.
- 사이트 url: [나만의 .gitignore 파일 만들기](https://www.toptal.com/developers/gitignore)
- 