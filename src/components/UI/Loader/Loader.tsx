import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./Loader.module.scss";

export const Loader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(false);

        const handleRouteChangeStart = () => setIsLoading(true);
        const handleRouteChangeEnd = () => setIsLoading(false);

        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeEnd);
        router.events.on("routeChangeError", handleRouteChangeEnd);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeEnd);
            router.events.off("routeChangeError", handleRouteChangeEnd);
        };
    }, [router.events]);

    if (!isLoading) return null;

    return (
        <div className={style.backdrop}>
            <div className={style.lds_ellipsis}>
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};
