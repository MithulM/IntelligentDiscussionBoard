import { Suspense } from "react";

function Loading({ children }) {
    return (
        <Suspense fallback={<div className="loading">Loading...</div>}>
            {children}
        </Suspense>
    );
}
export default Loading;