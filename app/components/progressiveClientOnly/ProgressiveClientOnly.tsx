import { useHydrated } from "remix-utils/use-hydrated";
export function ProgressiveClientOnly({
	children,
}: {
	children: React.ReactNode | (() => React.ReactNode);
}) {
	const isHydrated = useHydrated();
	return (
		<div className={"animate-appear"}>
			{typeof children === "function" ? children() : children}
		</div>
	);
}
