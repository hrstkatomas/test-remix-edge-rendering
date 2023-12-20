import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/button";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<h1>Welcome to Remix</h1>

			<ul>
				<li>
					<Link to={`/live`}>To Live</Link>
				</li>
				<li>
					<Link to={`/league`}>To league</Link>
				</li>
				<li>
					<Link to={`/events/1`}>To event 1</Link>
				</li>
			</ul>

			<Button>Hello there</Button>
		</div>
	);
}
