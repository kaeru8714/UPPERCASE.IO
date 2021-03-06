# 모델 생성
UPPERCASE.IO는 Model-View 패턴을 따릅니다. 여기서는 Model에 해당하는 부분을 만드는 방법을 알아보겠습니다.

## MongoDB 실행하기
UPPERCASE.IO는 데이터베이스로 MongoDB를 사용합니다. 콘솔 혹은 터미널에서 MongoDB를 실행합니다.

###### Mac or Linux
```
mongod
```

###### Windows
```
C:
cd "C:\Program Files\MongoDB 2.6 Standard\bin"
mongod
```

## 데이터베이스 설정
프로젝트 실행을 위해 `BOOT` 코드가 작성되어 있는 소스 파일을 열어 데이터베이스 설정을 작성합니다.

```javascript
require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
        isDevMode : true,
		defaultBoxName : 'Sample',
        title : 'Sample',
		webServerPort : 8888
	},
	NODE_CONFIG : {
	    // 데이터베이스 설정
		// 데이터베이스 이름은 Sample 입니다.
		dbName : 'Sample'
	}
});
```

## 모델 코드 작성
이제, 모델 코드를 작성해보겠습니다. 프로젝트의 COMMON 폴더 이하에 SomeModel.js를 만들어 봅시다. 이 때, 데이터 검증을 위해 UPPERCASE.JS의 VALID 기능을 사용하므로 해당 내용을 숙지하시기 바랍니다.

###### SomeModel.js
```javascript
Sample.SomeModel = OBJECT({

	preset : function() {
		'use strict';

		// 모델은 각 BOX에 할당되어 있는 MODEL을 상속하여 만듭니다.
		return Sample.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet = {
			
			// 종류
			kind : {
				// 필수 입력
				notEmpty : true,
				// 아래 값들 중 하나여야 함
				one : ['dog', 'pig', 'cow']
			},
			
			// 이름
			name : {
				// 필수 입력
				notEmpty : true,
				// 최소 2글자에서 최대 10글자까지 작성 가능
				size : {
					min : 2,
					max : 10
				}
			}
		};

		return {
			// 모델 명
			name : 'Some',
			// 모델의 기능들에 대한 설정
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				}
			}
		};
	}
});
```

## 모델 작동 확인하기
모델 작동을 확인하기 위해 프로젝트의 NODE 폴더 이하에 MAIN.js를 만들어, 다음과 같은 코드를 추가해 보겠습니다. MAIN.js는 UPPERCASE.IO가 프로젝트 부팅 시 맨 처음 실행하는 코드입니다.

###### MAIN.js
```javascript
Sample.MAIN = METHOD({

	run : function() {
		'use strict';
		
		// 멀티 코어 CPU에서 하나의 코어에서만 아래 내용 실행
		if (CPU_CLUSTERING.getWorkerId() === 1) {
			
			// 부팅 후 1초 후에 실행
			DELAY(1, function() {
				
				// 모델 생성
				Sample.SomeModel.create({
					name : 'Maru',
					kind : 'dog'
				}, function(savedData) {
					console.log(savedData);
				});
				
				// 모델 생성2
				Sample.SomeModel.create({
					name : 'Pomi'
				});
			});
		}
	}
});
```

프로젝트를 실행합니다. 만약 프로젝트가 실행중이라면 `Ctrl + C` 등으로 종료 후 다시 실행합니다.

```
node Sample.js
```

콘솔 혹은 터미널에 아래와 같이 출력된다면 모델이 잘 만들어진 것입니다!

```
[UPPERCASE.IO-MODEL] `Sample.Some/create` NOT VALID. { kind: { type: 'notEmpty', value: undefined } }
{ name: 'Maru',
  kind: 'dog',
  createTime: Thu Mar 26 2015 13:35:30 GMT+0900 (대한민국 표준시),
  id: '55138c9298bf39e806ffd616' }
```

[Robomongo](http://www.robomongo.org)등의 MongoDB 관리 툴로 데이터가 잘 생성되었는지 확인해보시기 바랍니다.

다음 문서: [간단 블로그 만들기](MAKE_BLOG.md)