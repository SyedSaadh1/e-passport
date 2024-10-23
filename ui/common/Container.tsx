import React, { PropsWithChildren } from "react";

export default function Container({ children, className }: PropsWithChildren<{ className?: string }>) {
    return <section className={`mx-auto max-w-screen-2xl px-2 ${className}`}>
        {children}
    </section>
}