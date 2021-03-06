# UPPERCASE.JS
※ 이 문서는 작성중인 문서입니다.

UPPERCASE.IO는 UPPERCASE.JS를 기반으로 개발되어 있습니다. 따라서 UPPERCASE.IO 기반 프로젝트를 개발하시려면, 먼저 UPPERCASE.JS에 대해 숙지하셔야 합니다.

* [UPPERCASE.JS 저장소](https://github.com/Hanul/UPPERCASE.JS)

다행히, UPPERCASE.JS의 모든 내용을 이해하실 필요는 없습니다! 아래 서술된 내용들만 익히셔도 프로젝트를 개발하는데에는 아무런 문제가 없습니다. 자세한 내용은 UPPERCASE.JS의 문서를 참고하시기 바랍니다.

앞에 `SomeBox.`라고 붙은 기능들은 UPPERCASE.IO가 각 BOX들에서 사용할 수 있도록 wrapping한 기능들입니다. 이를 통해 각 BOX끼리 겹치지 않게 사용할 수 있습니다.
```javascript
// UPPERCASE.JS
var store = STORE('store');

// UPPERCASE.IO, Sample BOX의 기능으로 사용한다.
var store = Sample.STORE('store');
```

## UPPERCASE.JS-COMMON 부분
브라우저와 Node 양쪽에서 구동가능한 기능들의 모음입니다.

### 객체지향 프로그래밍
* `CLASS`
* `OBJECT`

### 유틸리티
* `CHECK_ARE_SAME`
* `CHECK_IS_ARRAY`
* `CHECK_IS_DATA`
* `CHECK_IS_EMPTY_DATA`
* `CHECK_IS_IN`
* `COMBINE`
* `COPY`
* `EXTEND`
* `FIND`
* `REMOVE`
* `CALENDAR`
* `DELAY`
* `INTERVAL`
* `RAR`
* `RUN`
* `INTEGER`
* `RANDOM`
* `REAL`
* `EACH`
* `REPEAT`
* `VALID`
* `RANDOM_STR`
* `PARALLEL`
* `NEXT`

### 기타
* `METHOD`
* `TO_DELETE`


## UPPERCASE.JS-BROWSER 부분

### Window 관련
* `SCROLL_LEFT`
* `SCROLL_TOP`
* `TITLE`
* `WIN_HEIGHT`
* `WIN_WIDTH`

### Dom 관련
* `HTML 태그 지원` 
* `ADD_STYLE`
* `RGBA`
* `EVENT_ONCE`
* `EVENT`
* `ANIMATE`
* `KEYFRAMES`
* `CLEAR_BOTH`

### VIEW 관련
* `SomeBox.GO_NEW_WIN`
* `SomeBox.GO`
* `SomeBox.HREF`
* `SomeBox.MATCH_VIEW`
* `SomeBox.REFRESH`
* `SomeBox.VIEW`

### Request 관련
* `SomeBox.REQUEST`
* `SomeBox.GET`
* `SomeBox.POST`
* `SomeBox.PUT`
* `SomeBox.DELETE`

### 기타
* `INFO`
* `MSG`
* `SomeBox.STORE`


## UPPERCASE.JS-NODE 부분

### File 관련
* `CHECK_IS_EXISTS_FILE`
* `COPY_FILE`
* `CREATE_FOLDER`
* `FIND_FILE_NAMES`
* `FIND_FOLDER_NAMES`
* `MOVE_FILE`
* `READ_FILE`
* `REMOVE_FILE`
* `WRITE_FILE`

### Request 관련
* `REQUEST`
* `GET`
* `POST`
* `PUT`
* `DELETE`

### 기타
* `SomeBox.SHARED_STORE`
* `SHA1`