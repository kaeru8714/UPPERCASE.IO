# 프로젝트 성능 향상

## 너무 많은 문서 추가나 수정이 일어날 경우 데이터베이스가 lock에 걸릴 수 있습니다.
이는 MongoDB의 단점 중의 하나로, 순간적으로 너무 많은 문서 추가나 수정이 발생하면 데이터베이스가 lock에 걸려 반응 속도가 현저히 떨어집니다. 이럴 경우에는 Redis 같은 캐시 솔루션을 사용하시기 바랍니다.

## 자주 변경되는 문서는 `updateNoHistory`를 사용합니다.
게시판 게시글의 조회수 같은 경우는 굳이 history를 남길 필요가 없습니다. 이럴 경우 `updateNoHistory`를 사용합니다. 또한 `updateNoHistory`는 `lastUpdateTime`을 갱신하지 않습니다.
