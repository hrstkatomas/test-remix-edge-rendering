import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getScoccerEvents } from "~/utils/soccer";
import Livetable from "~/components/livetable/Livetable";

export const meta: MetaFunction = () => {
	return [
		{ title: "Livesport home page" },
		{ name: "description", content: "Livesport.cz home page" },
	];
};

export const loader = async () => {
	const events = await getScoccerEvents();
	return json(events);
};

export default function Index() {
	const data = useLoaderData<typeof loader>();

	return (
		<Livetable
			leagues={data.leagues}
			events={data.events.map((event) => ({
				...event,
				startTime: new Date(event.startTime),
			}))}
		/>
	);
}
