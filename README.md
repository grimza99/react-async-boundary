# 🧱 @grimza99/react-async-boundary

> Integrated **React Suspense + ErrorBoundary** wrapper for async components  
>  
> 비동기 컴포넌트를 위한 **React Suspense + ErrorBoundary 통합 래퍼 라이브러리**

`@grimza/react-async-boundary` is a lightweight utility library that simplifies asynchronous rendering in React.  
It provides a unified component (`<AsyncBoundary>`) and a hook (`useAsync`) to seamlessly handle loading, error, and success states —  
without manually writing complex Suspense + ErrorBoundary logic.

---

## usage

### application
```js
import { AsyncBoundary } from "@grimza99/react-async-boundary";

...
      <AsyncBoundary
          loadingFallback={<div>loading...</div>}
          errorFallback={<div>error!</div>}
        >
          <ExampleComponent />
        </AsyncBoundary>
```

**or**

```js
import { AsyncBoundary } from "@grimza99/react-async-boundary";

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
          <ExampleComponent />
        </AsyncBoundary>
```

### ExampleComponent
e.g.)

>  You must use useAsyncBoundary in order to trigger the ErrorBoundary fallback UI.
> A stable key must be provided to prevent repeated re-execution within Suspense, which can otherwise cause continuous re-rendering and infinite fallback cycles.
```js
import { useAsyncBoundary } from "@grimza99/react-async-boundary";
...
export default function ExampleComponent() {
  const { data } = useAsyncBoundary(()=>yourAsyncFn(),'key'); 

  return (
    <div>
      <img
        src={data}
        ...
      />
    </div>
  );
}
```

## 📦 Installation 

```bash
npm i @grimza99/react-async-boundary
