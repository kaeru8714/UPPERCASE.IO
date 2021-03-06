# UPPERCASE.IO-MODEL
UPPERCASE.IO는 Model-View 패턴을 따릅니다. 이 모듈은 Model-View 패턴에서 Model 부분을 다루고 있습니다. 자체적으로 제공하는 기본적인 기능들 외에도 모델에 복잡한 Business Logic을 추가하여 확장시킬 수 있습니다.

*※ UPPERCASE.IO 기반 프로젝트는 이 모듈이 자동으로 포함됩니다. 이하 내용들은 이 모듈을 따로 사용할 때 필요한 내용입니다.*

## 파일 구성
아래 파일들을 다운로드 받아 아래 사용 방법 항목을 참고하여 사용합니다.
* UPPERCASE.IO-MODEL 폴더
* UPPERCASE.IO-DB 폴더
* UPPERCASE.IO-ROOM 폴더
* UPPERCASE.IO-TRANSPORT 폴더
* UPPERCASE.JS-COMMON.js
* UPPERCASE.JS-NODE.js
* UPPERCASE.JS-BROWSER.js
* UPPERCASE.JS-BROWSER-FIX 폴더

## 사용 방법
`UPPERCASE.IO-MODEL`은 `UPPERCASE.JS`와 `UPPERCASE.IO-ROOM`, `UPPERCASE.IO-DB`를 기반으로 합니다.

### node.js 환경에서 필요한 모듈 import

```javascript
// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-TRANSPORT.
require('../../../UPPERCASE.IO-TRANSPORT/NODE.js');

// load UPPERCASE.IO-ROOM.
require('../../../UPPERCASE.IO-ROOM/NODE.js');

// load UPPERCASE.IO-DB.
require('../../../UPPERCASE.IO-DB/NODE.js');

// load UPPERCASE.IO-MODEL.
require('../../../UPPERCASE.IO-MODEL/NODE.js');
```

### 웹 브라우저 환경에서 필요한 모듈 import

```html
<script>
	global = window;
</script>

<!-- import UPPERCASE.JS -->
<script src="UPPERCASE.JS-COMMON.js"></script>
<script src="UPPERCASE.JS-BROWSER.js"></script>
<script>
	BROWSER_CONFIG.fixScriptsFolderPath = 'UPPERCASE.JS-BROWSER-FIX';
	LOAD('UPPERCASE.JS-BROWSER-FIX/FIX.js');
</script>

<!-- import UPPERCASE.IO-TRANSPORT -->
<script src="UPPERCASE.IO-TRANSPORT/BROWSER.js"></script>

<!-- import UPPERCASE.IO-ROOM -->
<script src="UPPERCASE.IO-ROOM/BROWSER.js"></script>

<!-- import UPPERCASE.IO-MODEL -->
<script src="UPPERCASE.IO-MODEL/BROWSER.js"></script>
```

`UPPERCASE.IO-ROOM`을 기반으로 하기 때문에 룸 서버 설정을 완료한 후 사용 가능합니다. 이에 대한 자세한 사항은 [UPPERCASE.IO-ROOM](UPPERCASE.IO-ROOM.md) 문서를 살펴보시기 바랍니다. 실제 모델 구현은 node.js 환경과 웹 브라우저 환경에서 동일한 코드로 작성할 수 있습니다.

### 모델 구현 예시

```javascript
// Example Model
TestBox.TestModel = OBJECT({

	preset : function() {
		return TestBox.MODEL;
	},

	params : function() {

		var
		// valid data set
		validDataSet = {
			name : {
				notEmpty : true,
				size : {
					min : 0,
					max : 255
				}
			},
			age : {
				notEmpty : true,
				integer : true
			},
			isMan : {
				bool : true
			}
		};

		return {
			name : 'Test',
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				},
				remove : {
					role : 'Test'
				}
			}
		};
	}
});
```

기본으로 제공되지 않는 기능에 대한 모델의 확장은 node.js 환경과 웹 브라우저 환경에서 각각 진행합니다. 기본으로 제공되는 기능은 아래 API 항목을 참고하시기 바랍니다.

### node.js 환경에서 모델의 확장 예시

```javascript
OVERRIDE(TestBox.TestModel, function(origin) {
	'use strict';

    TestBox.TestModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {

            // 이 방법으로 기본적으로 제공하는 create, get, update, remove, find, count, checkIsExists를 확장할 수 있습니다.
			inner.on('create', {

				before : function(data, next, ret, clientInfo) {

					// 데이터를 생성하기 전에 실행되는 함수입니다.
					// return false; 를 하면, 이 함수가 실행되고 난 후 자동으로 데이터베이스에 값이 생성되지 않고, 데이터베이스에 값을 생성하기 위해서는 반드시 next(); 를 실행해야 합니다.
					// ret 함수는 클라이언트에 직접 데이터를 전달할 때 사용합니다.
				},

				after : function(savedData, next, ret, clientInfo) {

					// 데이터가 생성되고 난 후 실행되는 함수입니다.
					// return false; 를 하면, 이 함수가 실행되고 난 후 자동으로 클라이언트에 값을 전달하지 않고, 클라이언트에 값을 전달하기 위해서는 반드시 next(); 를 실행해야 합니다.
					// ret 함수는 클라이언트에 직접 데이터를 전달할 때 사용합니다.
				}
			});
			
			// 모델에서 사용하는 룸과 같은 룸을 생성하여, 클라이언트에서 모델의 룸으로 전달하는 메시지를 받아서 처리할 수 있습니다.
			TestBox.ROOM(self.getName(), function(clientInfo, on) {

				on(...
			});
		}
	});
});
```

### 웹 브라우저 환경에서 모델의 확장 예시

```javascript
OVERRIDE(TestBox.TestModel, function(origin) {
	'use strict';

    TestBox.TestModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {

			var
			// 모델에서 사용하는 룸을 가져옵니다.
			room = self.getRoom();
			
			room.send(...
		}
	});
});
```

## API
* `MODEL` Model(include CRUD functions) interface [예제보기](https://github.com/UPPERCASE-Series/UPPERCASE.IO/blob/master/EXAMPLES/MODEL/CLIENT/MODEL.js)
```javascript
TestBox.TestModel = OBJECT({
	preset : function() {
		return TestBox.MODEL;
	},
	params : function() {
		return {
			name : 'Test',
			methodConfig : {
				create : ...,
                get : ...,
				update : ...,
				remove : ...,
                find : ...,
                count : ...,
                checkIsExists : ...
			}
		};
	}
});
TestBox.TestModel.create(data, function() {...})
TestBox.TestModel.create(data, {error:, success:})
TestBox.TestModel.get(id, function() {...})
TestBox.TestModel.get(id, {success:, notExists:, error:})
TestBox.TestModel.get({filter:, sort:, isRandom:}, {success:, notExists:, error:})
TestBox.TestModel.update(data, function() {...})
TestBox.TestModel.update(data, {success:, notExists:, error:})
TestBox.TestModel.remove(id, function() {...})
TestBox.TestModel.remove(id, {success:, notExists:, error:})
TestBox.TestModel.find({filter:, sort:, start:, count:}, function() {...})
TestBox.TestModel.find({filter:, sort:, start:, count:}, {error:, success:})
TestBox.TestModel.count({filter:}, function() {...})
TestBox.TestModel.count({filter:}, {error:, success:})
TestBox.TestModel.checkIsExists({filter:}, function() {...})
TestBox.TestModel.checkIsExists({filter:}, {error:, success:})
TestBox.TestModel.onNew(properties, handler)
TestBox.TestModel.onNewWatching(properties, handler)
TestBox.TestModel.onNewAndFind({properties:, filter:, sort:, start:, count:}, {error:, success:})
TestBox.TestModel.onNewAndFindWatching({properties:, filter:, sort:, start:, count:}, {error:, success:})
TestBox.TestModel.onRemove(properties, handler)
```
