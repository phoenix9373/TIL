> 0921_TIL



# Model Relationship



- 모델 관계 종류
  - Many-to-one





## 1. Many to one

- Foreign Key (외래 키)
- 다른 테이블의 키(외래키)를 여러번 참조할 수 있다.

- 참조되는 테이블(게시글)

![image-20200921112411739](C:%5CUsers%5CYu%20JinWoo%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20200921112411739.png)

- 참조하는 테이블(댓글)

  ![image-20200921112437276](C:%5CUsers%5CYu%20JinWoo%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20200921112437276.png)

- 참조 무결성: 각각의 테이블마다 `id`를 가지고, `id`는 참조 무결성, 즉 해당 테이블에서 유일하게 존재하는 키를 항상 가진다. 꼭 `id`일 필요는 없지만, 대부분 `id`를 유일키로 주로 활용한다.

- Many to one은 1:N의 관계이다.
- 1:N의 관계에서 추가적인 데이터는 `N` 쪽의 테이블에서 가지고 있다.





### Many to one 예시

- `Comment` --(참조)--> `Article`

- `Article` 모델을 참조하는 `Comment` 모델 클래스를 만든다.

```python
class Article(models.Model): # 상속
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

- ForeignKey를 활용하여 `Article` 테이블을 참조하는 `Comment` 테이블을 작성한다.

```python
class Commnet(models.Model):
    # 외래키는 항상 참조하는 테이블의 소문자로 변수를 활용한다.
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

- 자식 테이블에서 **외래 키**는 항상 참조하는 **부모 테이블 이름의 소문자**로 활용한다.
- `on_delete`: 부모 테이블(Article)에서 참조된 객체가 삭제됬을 때, 자식 테이블(Comment)에서 해당 객체를 어떻게 처리하는지에 대한 옵션.
  - **CASCADE: 부모 객체가 삭제됐을 때, 이를 참조하는 자식 객체도 삭제**(주로 사용하는 옵션.)
  - PROTECT: 참조가 되어있는 경우, 오류 발생.
  - SET_NULL: 모든 값을 NULL로 치환.
  - SET_DEFAULT: 모든 값이 DEFAULT 값으로 치환.

- 결과1
  -  `python manage.py makemigrations`로 마이그레이션 작업을 완료하면 다음과 같이 `migrations` 폴더에 해당 클래스 이름의 파일이 생긴다.

```python
class Migration(migrations.Migration):
    
    # Comment 마이그레이션은 아래 파일에 의존한다. (or 참조한다.)
    dependencies = [
        ('articles', '0001_initial'), # articles 앱의 0001_initial 파일.
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='articles.article')),
            ],
        ),
    ]

```

- 결과2
  - `db.sqlite3`에서 찾아보면 다음과 같이 테이블이 생성된다.
  - 위에서 `article = models.ForeignKey(Article, on_delete=models.CASCADE)`을 하는 과정에서 `article` 변수 이름 뒤에 `_id` 가 자동으로 붙어서 `article_id`로 테이블의 column 이름이 생성된다.
  - ![image-20200921121055235](0921_TIL_Model%20Relationship.assets/image-20200921121055235.png)

- 추가
  - 재귀적 외래 키(대댓글): 현재 작성한 게시글의 댓글에 다시 댓글을 작성한다.





### shell_plus

- `python manage.py shell_plus`로 대화형 인터프리터 실행.
- 실행결과
  - `Comment` 객체를 생성.
  - `content` 속성에 값 저장.
  - `article_id` 값이 빈 상태로 `save`하면 다음과 같은 에러 발생.
  - ![image-20200921140738049](0921_TIL_Model%20Relationship.assets/image-20200921140738049.png)

- 수정 결과
  - `Article` 객체를 가져온 후, `comment.article` 속성에 `Article` 객체를 넣는다.
  - ![image-20200921141234400](0921_TIL_Model%20Relationship.assets/image-20200921141234400.png)
- `id` 조회 방법
  1. column 명으로 조회하는 방법
     - `comment.article_id`: column 명이 `article_id`
  2. 속성 값으로 조회하는 방법
     - `comment.article.pk`: `Article` 객체의 속성인 `pk`를 이용.
- 역참조(외래 키를 가지지 않은 '참조되는' 테이블이 역으로 참조하는 방법)
  - 1번 게시글에 달린 모든 댓글은?
  - `Comment`가 foreign key로 `Article`을 참조했다면 반대 과정은 어떻게 할까?
  - 명령어: `article.comment_set`
  - 하나의 게시글에 달린 모든 댓글을 `QuerySet` 형태로 반환한다. <u>리스트로 활용하는 것</u>도 가능하다.
  - ![image-20200921142831197](0921_TIL_Model%20Relationship.assets/image-20200921142831197.png)
- QuerySet 조회 방법.
  - ![image-20200921143052969](0921_TIL_Model%20Relationship.assets/image-20200921143052969.png)



### 변수명 바꾸기

- 역참조 명령어의 경우, `article.comment_set`으로 실행된다.
- 이 때, `comment_set`으로 참조하지 않고, 다른 변수로 실행시키고 싶다면?**(1:N에서 사용 x, M:N에서 사용o)**





### 댓글(Comment) 모델에 대한 CRUD 작성

---

- 댓글을 입력하고, 입력한 정보를 바탕으로 작성하기 때문에 `Form`이 필요하다.

- `forms.py`에서 `ModelForm`을 활용하여 `CommentForm` 클래스를 만든다.

- detail 페이지에서 보여줄 것이므로 `urls.py`에서 추가할 path는 없다.

- `views.py`에서 detail 페이지를 렌더링할 때, `comment`에 대한 정보도 같이 `context`로 넘겨준다.

- ```python
  # views.py
  # GET 방식으로 FORM을 만듦.
  
  def detail(request, pk):
      article = Article.objects.get(pk=pk)
      comment_form = CommentForm()      # 기존의 article 객체의 form 변수 이름과 겹치지 않게.
      context = {
          'article': article,
          'comment_form': comment_form, # 넘겨준다.
      }
      return render(request, 'articles/detail.html', context)
  ```

- `detail.html`에서 `form` 태그 작성

---

- 사용자에게 받지 않게끔 하는 방법

  - `forms.py`에서  `fields = __all__`대신 제외할 변수에 대해 `exclude` 작성.

  - ```python
    class CommentForm(forms.ModelForm):
    
        class Meta:
            model = Comment
            # fields = '__all__'
            exclude = ['article', ]
    ```

  - 해당 form이 렌더링되는 페이지에 'article'에 대한 부분은 제외하고 나머지 부분만 출력된다.

---

- **댓글을 생성**하는 url, views 함수(**POST 메서드**)

  - 댓글에 대한 데이터를 받는 `GET` 메서드 형태의 `Form`은 detail 페이지에 구현됐다.
  - 그 다음, `POST` 방식으로 받아서 저장하기 위한 url과 views를 작성해야한다.
  - 주의할 점: POST에서 `request.POST`에 저장된 데이터는 위 `forms.py`에서 제외한 `article`을 제외한 나머지 데이터만 있다.

- 코드 작성

  - ```python
    @require_POST
    def comments_create(reqeust, pk):
        article = Article.objects.get(pk=pk) # 해당 디테일 페이지의 글 객체 생성.
        comment_form = CommentForm(request.POST) # request에는 article_id가 빠져있다.
        if comment_form.is_valid(): # 통과되지 못한 경우, 에러메시지를 포함하여 넘겨준다.
            # 'commit=False': Create, but don't save the new author instance.
            comment = comment_form.save(commit=False) # commit 조건은 인스턴스 생성만 하고, save는 아직 하지 않는다.
            comment.article = article # null인 곳에 값을 채우고
            comment.save() # 저장한다.
            return redirect('articles:detail', article.pk)
        context = {
            'comment_form': comment_form,
        }
        return render(request, 'articles/detail.html', context)
    ```

- `NoReverseMatch` 에러는 `templates` 파일만 보면 된다...!
- comment에 빈 값을 넘겨줬을 때, 넘겨준 값에 `article`이 존재하지 않기 때문에 에러가 발생.





### 특정(1번) 게시글에 있는 모든 댓글 조회

- `detail.html` 페이지에서 특정 게시글에 달린 모든 댓글을 조회.

- `views.py`에서 `detail `함수에서 해당 게시글의 댓글을 `context`에 넘겨준다.

- `# *`이 추가된 부분.

- ```python
  # 1. urls.py
  [path('<int:pk>/comments/', views.comments_create, name='comments_create'), ]추가.
  
  # 2. views.py
  
  def detail(request, pk):
      article = Article.objects.get(pk=pk)
      comment_form = CommentForm()
      # 특정 게시물에 있는 모든 댓글
      comments = article.comment_set.all() # *
      context = {
          'article': article,
          'comment_form': comment_form,
          'comments': comments, # *
      }
      return render(request, 'articles/detail.html', context)
  ```

- ```django
  # views 함수에서 받은 pk 값들의 네임을 잘 생각해서 넣자.
  
  {% for comment in comments %}
    <li>{{ comment.content }}</li>
    <form action="{% url 'articles:comments_delete' article.pk comment.pk %}" method="POST" class="d-inline">
      {% csrf_token %}
      <input type="submit" value="DELETE">
    </form>
  {% endfor %}
  ```

  





### 댓글 삭제

- 삭제기능 추가

```python
# 1. urls.py

[
    path('<int:article_pk>/comments/<int:comment_pk>/delete/', views.comments_delete, name='comments_delete'),
]


# 2. views.py

@require_POST
def comments_delete(request, article_pk, comment_pk):
    comment = Comment.objects.get(pk=comment_pk)
    comment.delete()
    return redirect('articles:detail', article_pk)
```





### 댓글 개수

- 댓글이 있으면 개수 출력

```django
# if문과 길이를 출력하는 함수 활용.

{% if comments|length %}
    <p>{{comments|length }} 개의 댓글이 있습니다. </p>
{% endif %}
```



- 없는 경우, '없음'을 출력

```django
{%empty%}
    <p>댓글이 없어요..</p>
```





### get_object_or_404

- `get_object_or_404`: 주어진 model managet에서 .get()을 호출하지만 모델의 **DoesNotExist(500 에러 = 서버에러)** 예외 대신 **Http404**를 발생시킨다.
- 즉, <u>해당 pk 값에 대한 테이블의 데이터</u>가 없는 건데 <u>서버에서 에러가 난 것처럼</u> 보여지는 것을 '방지'하기 위해 존재한다.
- 정확한 에러명은 **Not Found(404)**, 즉 해당 키 값이 존재하지 않는다고 말해야 정확한 에러를 알 수 있다.
- `article = Article.objects.get(pk=pk)` 코드에서 `pk`값에 해당하는 데이터가 없으면 나머지 코드를 무시하고 500 에러메세지를 반환한다.

- 잘못된 에러의 예시

  ![image-20200921154634009](0921_TIL_Model%20Relationship.assets/image-20200921154634009.png)

- 올바른 에러의 예시

  - 테이블에서 pk에 해당하는 데이터를 불러오기 위해 다음 코드를 활용한다.
  - `article = Article.objects.get(pk=pk)`

  ![image-20200921155020385](0921_TIL_Model%20Relationship.assets/image-20200921155020385.png)





- `django.shortcuts`이 없다면?

  ```python
  # try - except 구조로 직접 에러를 발생시킨다.
  
  try:
      article = Article.objects.get(pk=pk)
  except article.DoseNotError:
      raise HttpNotFound..?
  ```

  



### ModelForm의 Save 메서드

```python
>>> from myapp.models import Article
>>> from myapp.forms import ArticleForm

# Create a form instance from POST data.
>>> f = ArticleForm(request.POST)

# Save a new Article object from the form's data.
>>> new_article = f.save()

# Create a form to edit an existing Article, but use
# POST data to populate the form.
>>> a = Article.objects.get(pk=1)
>>> f = ArticleForm(request.POST, instance=a)
>>> f.save()
```



























