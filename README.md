# 🧱 @grimza99/react-async-boundary

> Integrated **React Suspense + ErrorBoundary** wrapper for async components  
>  
> 비동기 컴포넌트를 위한 **React Suspense + ErrorBoundary 통합 래퍼 라이브러리**

---

## 🌍 Overview | 개요

### 🇺🇸 English  
`@grimza/react-async-boundary` is a lightweight utility library that simplifies asynchronous rendering in React.  
It provides a unified component (`<AsyncBoundary>`) and a hook (`useAsync`) to seamlessly handle loading, error, and success states —  
without manually writing complex Suspense + ErrorBoundary logic.

### 🇰🇷 한국어  
`@grimza/react-async-boundary`는 React의 비동기 렌더링을 단순화하는 경량 유틸리티 라이브러리입니다.  
Suspense와 ErrorBoundary의 로직을 직접 작성하지 않아도,  
하나의 컴포넌트(`AsyncBoundary`)만으로 로딩, 성공, 에러 상태를 손쉽게 관리할 수 있습니다.

---

## usage

### application
```bash
...
      <AsyncBoundary
          loadingFallback={<div>loading...</div>}
          errorFallback={<div>error!</div>}
        >
          <ErrorComponent />
        </AsyncBoundary>
```

**or**

```bash
...
      <AsyncBoundary
          loadingFallback={<div>loading...</div>}
          errorFallback={(error, reset) => (
            <div>
              <p>{error.message}</p>
              <button onClick={reset}>retry</button>
            </div>
          )}
        >
          <ErrorComponent />
        </AsyncBoundary>
```

### ErrorComponent
e.g.)

```
const cache = {
  promise: null,
  data: null,
  error: null,
};
function fetchImage() {
  if (!cache.promise) {
    cache.promise = new Promise((resolve, reject) => {
      //...asyncFn
    })
      .then((res) => (cache.data = res))
      .catch((err) => (cache.error = err));
    throw cache.promise;

export default function ErrorComponent() {
  const image = fetchImage(true);

  if (image instanceof Error) {
    throw error;
  }
  return (
      <img
        src={image}
        ...
      />
  );
}

```

## 📦 Installation 

```bash
npm i @grimza99/react-async-boundary
