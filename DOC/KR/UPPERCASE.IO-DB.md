# UPPERCASE.IO-DB
MongoDB를 사용하기 쉽게 CRUD 기능을 구현한 모듈입니다.

*※ UPPERCASE.IO 기반 프로젝트는 이 모듈이 자동으로 포함됩니다. 이하 내용들은 이 모듈을 따로 사용할 때 필요한 내용입니다.*

## 파일 구성
아래 파일들을 다운로드 받아 아래 사용 방법 항목을 참고하여 사용합니다.
* UPPERCASE.IO-DB 폴더
* UPPERCASE.JS-COMMON.js
* UPPERCASE.JS-NODE.js

## 사용 방법
`UPPERCASE.IO-DB`는 `UPPERCASE.JS`를 기반으로 합니다.

```javascript
// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-DB.
require('../../../UPPERCASE.IO-DB/NODE.js');

CONNECT_TO_DB_SERVER({
	name : 'test'
}, function() {

	var
	// db
	db = TestBox.DB('test');
	...
});
```

## API
* `CONNECT_TO_DB_SERVER({username:, password:, host:, port:, name:}, function() {...})` connect to MongoDB server. [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)
* `DB(name)` MongoDB collection wrapper [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/DB.js)
```javascript
db = TestBox.DB('test');
db.create(data, function(savedData) {...})
db.create(data, {error:, success:})
db.get(id, function(savedData) {...})
db.get(id, {success:, notExists:, error:})
db.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})
db.update(data, function(savedData, originData) {...})
db.update(data, {success:, notExists:, error:})
db.remove(id, function(originData) {...})
db.remove(id, {success:, notExists:, error:})
db.find({filter:, sort:, start:, count:}, function(savedDataSet) {...})
db.find({filter:, sort:, start:, count:}, {error:, success:})
db.count({filter:}, function(count) {...})
db.count({filter:}, {error:, success:})
db.checkIsExists({filter:}, function(isExists) {...})
db.checkIsExists({filter:}, {error:, success:})
```
* `LOG_DB(name)` MongoDB collection wrapper class for logging [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/DB/NODE/LOG_DB.js)
```javascript
logDB = TestBox.LOG_DB('testLog');
logDB.log(data)
```

### 사용 가능한 특수 기호
`get`, `find` 명령의 `filter`에는 다음과 같은 특수기호를 사용할 수 있습니다.
* `$and`
```javascript
// a가 3이고, b가 2인 데이터를 찾습니다.
filter : {
    $and : [{
        a : 3
    }, {
        b : 2
    }]
}
```
* `$or`
```javascript
// a가 3이거나, b가 2인 데이터를 찾습니다.
filter : {
    $or : [{
        a : 3
    }, {
        b : 2
    }]
}
```
* `$gt`
```javascript
// a가 3보다 큰 데이터를 찾습니다.
filter : {
    $gt : {
        a : 3
    }
}
```
* `$gte`
```javascript
// a가 3보다 크거나 같은 데이터를 찾습니다.
filter : {
    $gte : {
        a : 3
    }
}
```
* `$lt`
```javascript
// a가 3보다 작은 데이터를 찾습니다.
filter : {
    $lt : {
        a : 3
    }
}
```
* `$lte`
```javascript
// a가 3보다 작거나 같은 데이터를 찾습니다.
filter : {
    $lte : {
        a : 3
    }
}
```
* `$ne`
```javascript
// a가 3이 아닌 데이터를 찾습니다.
filter : {
    $ne : {
        a : 3
    }
}
```

`update` 명령의 `data`에 다음과 같은 특수기호를 사용하여 데이터를 가공할 수 있습니다.
* `$inc`
```javascript
// num이 2 증가합니다.
SampleModel.update({
    ...
    $inc : {
        num : 2
    }
})
```
```javascript
// num이 2 감소합니다.
SampleModel.update({
    ...
    $inc : {
        num : -2
    }
})
```
* `$addToSet`
```javascript
// 배열 array에 3이 없는 경우에만 3을 추가합니다.
SampleModel.update({
    ...
    $addToSet : {
        array : 3
    }
})
```
* `$push`
```javascript
// 배열 array에 3을 추가합니다.
SampleModel.update({
    ...
    $push : {
        array : 3
    }
})
```
* `$pull`
```javascript
// 배열 array에서 3을 제거합니다.
SampleModel.update({
    ...
    $pull : {
        array : 3
    }
})
```
* `$pull`
```javascript
// 배열 array에서 a가 3인 데이터를 제거합니다.
SampleModel.update({
    ...
    $pull : {
        array : {
            a : 3
        }
    }
})
```

## 특정 문서의 수정 내역을 가져오는 방법
특정 문서의 수정 내역은 문서가 저장된 데이터베이스 이름 뒤에 `__HISTORY`를 붙혀 `DB` 오브젝트를 만들고, `find`로 가져올 수 있습니다. 
```javascript
var
// history db
historyDB = TestBox.DB('test__HISTORY');

db.find({filter:}, function(historyDataSet) {...})
```

## 설정
이하 설정을 적용하면 작동 방식이 결정됩니다.
* `NODE_CONFIG.isDBLogMode` 데이터베이스 로그 모드를 켜고자 할 때 `true`로 설정합니다. 데이터가 수정 될 경우 console에 로그를 띄어줍니다. 기본값은 `false` 입니다.
* `NODE_CONFIG.maxDataCount` find 명령으로 한번에 가져올 수 있는 최대 data 수를 설정합니다. 기본값은 `1000` 입니다.

## MongoDB 사용 시 주의사항
* **MongoDB는 32bit 컴퓨터에서는 심각한 제한이 있습니다. 32bit 컴퓨터가 다룰 수 있는 크기가 최대 4gb 이기 때문입니다. 따라서 실제 운영 시에는 반드시 64bit 운영체제 위에서 구동하시기 바랍니다.**
* DB의 update명령어가 동시에 여러번 호출 될 경우 비동기 처리에 의해 모든 update는 같은 데이터(수정된)를 반환합니다.
* find 명령시 filter의 모든 property가 `undefined`로만 이루어진 경우, 모든 값을 가져옵니다. 이는 `filter : {}`와 같기 때문입니다. 이를 방지하려는 경우에는, `CHECK_ARE_SAME([{}, filter])`로 filter가 비어있는지 검사해 주시기 바랍니다.
