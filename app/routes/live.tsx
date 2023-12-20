import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// this loads on the server
export const loader = async () => {
	return json({ ok: true });
};

export default function LiveTable() {
	// this is how to access data from the loader
	const data = useLoaderData<typeof loader>();
	console.log(data);
	return (
		<div>
			<div> Live table </div>
			<div>{JSON.stringify(data)}</div>

			<Link to={"/"}>BACK</Link>
		</div>
	);
}
