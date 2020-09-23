> 0923_TIL



# django customizing authentication





### User

- 커스텀 유저 모델로 대체하기
  - 유저 지정 모델을 참조하는 **AUTH_USER_MODEL** 설정 값을 변경해 기본 유저 모델을 재정의(Override)할 수 있다.(`settings.py`에서 설정 가능.)
  - Django에서는 커스텀 유저 모델을 설정하는 것을 권장.
  - 필요한 경우 '맞춤 설정'할 수 있기 때문
  - **단, 프로젝트의 첫 migrate를 실행하기 전에 완료해야한다.**





#### - AUTH_USER_MODEL

> `settings.py`에 존재. 단, 프로젝트 내에 생성된 `settings.py`도 `override` 된 것이므로 위 값은 홈페이지에서 찾아볼 수 있다.

- User를 나타내는데 사용하는 모델
- 기본 값은 `auth.User` (auth라는 django 기본 앱에 있는 User Model.)
- 주의 사항
  - 프로젝트가 진행되는 동안 AUTH_USER_MODEL 값을 변경할 수 없다.
  - 프로젝트 시작 시 설정하고, Custom User로 대체하는 방법을 참고한다.



#### - AbstactBaseUser & AbstractUser

- 상속관계

- `models.Model`
  - `class AbstactBaseUser`: `password`와 `last_login` 필드만 가지고 있음. 자유도가 높지만 다른 필요한 필드는 모두 작성해야함.
    - `class AbstractUser`: **관리자 권한(`class PermissionsMixin`)과 함께 완전한 기능을 갖춘 유저 모델을 구현하는 기본 클래스**.
      - `class User`: 실제 기능은 `AbstractUser`에 구현되어 있고, '유저' 자체를 표현하기 위한 클래스.





## :film_projector: 작업 순서



- 유저 권한을 다루는 `accounts` 앱의 `models.py`는 어떤 모델도 구현하지 않은 상태.

- Custom으로 `User` 클래스를 대체한다. 기능 상으로는 기본값과 동일하지만 추후 확장 가능성을 열어둔다.

```python
# 1. accounts/models.py

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


# 2. <프로젝트 폴더>/settings.py
# 위에서 확장한 User 클래스를 기본 유저 권한 모델로 설정.(Overriding)

AUTH_USER_MODEL = 'accounts.User'
```



- `admin.py`에서 새로운 유저를 등록한다.

```python
# 3. accounts/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)
```



---

- 기존에 진행한 프로젝트에서 다시 `User` 클래스를 커스터마이징하려는 경우, migration과 db를 초기화해야한다.
  - migrate에 `__`가 붙은 파일을 제외하고 모두 삭제한다.
  - `db.sqlite3`를 삭제한다.
  - `bash` 창에서 마이그레이션 작업을 한다. `makemigrations` , `migrate`
  - `python manage.py createsuperuser`로 새로운 유저를 생성한다.



---

- 여기서 서버를 키고, 회원가입을 진행하면 다음과 같은 에러가 발생한다.
- <img src="C:%5CUsers%5CYu%20JinWoo%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20200923104219107.png" alt="image-20200923104219107" style="zoom:67%;" />
- 이는 회원가입을 진행하는 `UserCreationForm`은 다음과 같이 상속을 하기 때문이다.
  - `ModelForm`
    - `User`
      - `auth.user`: 최상위 클래스.
- 따라서 기본 `User`클래스를 우리가 처음에 만든 Custom 유저 모델로 변경해야한다.
- User와 연결되어 있어서 커스텀 유저 모델을 사용하려면 다시 작성하거나 확장해야하는 Form
  - `UserCreationForm`: 회원가입 form
  - `UserChangeForm`: 회원 정보 수정 form



```python
# 1. accounts/forms.py

# 이전에 작성한 회원가입 Form을 그대로 상속하는 Custom_<기존 클래스 이름>의 클래스를 생성한다.
from django.contrib.auth.forms import UserCreationForm

# 현재 활성화된 유저를 가지고 오는 get_user_model을 활용한다.
from django.contrib.auth import get_user_model


class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta): # Meta 정보도 그대로 상속.
        model = get_user_model()
        # fields도 이전에 사용한 fields 들과 추가로 'custom_field'를 작성한다.
        fields = UserCreationForm.Meta.fields + ('custom_field',) # ex: ('email', )
```

- `CustomUserCreationForm`으로 `views.py` 에서 기존에 활용하던 `UserCreationForm`을 대체한다.







### :hammer_and_pick: Referencing the User model(유저 모델 참조하기)

- `setting.AUTH_USER_MODEL` : 문자열 타입 `accounts.User`

  - 유저 모델에 대한 <u>외래 키</u> 또는 <u>다 대다 관계</u>를 정의할 때 사용

  - **즉, `models.py`에서 유저 모델을 참조할 때 사용**

  - ```python
    # 1. articles/modles.py
    # settings.py에서 INSTALLED_APP에 등록된 순서가 articles가 먼저이므로, articles가 모두 실행된 후에 accounts가 실행된다. 따라서 get_user_model()을 사용하면 실행 순서에 의해 에러가 발생한다.
    
    from django.conf import settings
    from django.db import models
    
    class Article(models.Model):
        user = models.ForeignKey( # 변수명은 참조하는 대상의 소문자 + 단수형.
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE,
        )
    ```

  

  - `models.py`에 `user` field를 추가하면서 변경사항이 생겼다.

  - `models.py`에 변경사항이 생기면 `makemigrations`와 `migrate` 작업을 해서 `DB`에 변경된 사항을 알린다.
  - DB에 `models.py`에 변경사항을 적용하면 다음과 같은 테이블이 생긴다.
  - <img src="0923_TIL_User%20Authentication.assets/image-20200923113117246.png" alt="image-20200923113117246" style="zoom:80%;" />
  - 권장하는 방법은 `user_id` 부분에 대해 `NOT NULL` 또는 `DEFAULT` 설정을 해주는 것이 좋다.
  - 따라서 `makemigrations`를 하게 되면 2가지 옵션이 생기는데 1번은 직접 default를 넣는 방법이고 2번은 해당 프롬프트를 나가서 `models.py`에 default 옵션을 추가하는 방법이다.
  - ![image-20200923113436531](0923_TIL_User%20Authentication.assets/image-20200923113436531.png)

- `get_user_model()`: User 객체 (active)

  - 유저 모델을 직접 참조하는 대신 get_user_model()을 사용하여 유저 모델을 참조하라고 권장
  - 현재 활성 유저 모델(지정된 커스텀 유저 모델, 그렇지 않은 경우 User)
  - **즉, `models.py`가 아닌 다른 모든 곳에서 유저 모델을 참조할 때 사용.**



---



### Abstract base classes

- 테이블에 column으로 만들지 않지만 부모테이블의 데이터를 가져오는 방법

```python
class Article(models.Model): # 상속
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True # ***


class Comment(Article): # 상속
    content = models.TextField()
    
    # 실제 Comment 테이블에 Article 모델의 column(Field )이 추가되지 않지만 활용할 수는 있다.
```

