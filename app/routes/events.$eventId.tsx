import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

const getEvent = (evntId: string) => Promise.resolve({ evntId });

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.eventId, "Missing eventId param");
	const event = await getEvent(params.eventId);
	if (!event) {
		throw new Response("Not Found", { status: 404 });
	}
	return json({ event });
};

export default function Event() {
	const { event } = useLoaderData<typeof loader>();
	return (
		<div>
			<div> Event detail</div>
			<div>{JSON.stringify(event)}</div>
			<Link to={"/"}>BACK</Link>
		</div>
	);
}
