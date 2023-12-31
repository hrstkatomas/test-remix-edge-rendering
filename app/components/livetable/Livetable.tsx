import React, {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";
import League from "../league/League";
import type { EventRowType } from "../eventRow/EventRow";
import type { FunctionComponent } from "react";

export type LeagueType = {
	id: number;
	name: string;
	round: number;
	season: string;
};

type LivetableProps = {
	events: EventRowType[];
	leagues: LeagueType[];
};

const getGroupedEventsIntoLeagues = (
	events: EventRowType[],
	// pinned: Set<number>,
	sortBy: "league" | "time",
) => {
	if (sortBy === "time") {
		const leagues: Map<string, EventRowType[]> = new Map();
		const sortedEventsByTime = [...events].sort(
			(a, b) => a.startTime.getTime() - b.startTime.getTime(),
		);

		sortedEventsByTime.forEach((event) => {
			const leagueKey = `${event.leagueId}-${event.startTime.getTime()}`;

			if (!leagues.has(leagueKey)) {
				leagues.set(leagueKey, []);
			}

			leagues.get(leagueKey)?.push(event);
		});

		return leagues;
	}

	const leagues: Map<number, EventRowType[]> = new Map();

	events.forEach((event) => {
		const leagueKey = event.leagueId;

		if (!leagues.has(leagueKey)) {
			leagues.set(leagueKey, []);
		}

		leagues.get(leagueKey)?.push(event);
	});

	const finalLeagues = new Map([...leagues]);

	[...finalLeagues.keys()].forEach((leagueId) => {
		finalLeagues
			.get(Number(leagueId))
			?.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
	});

	return finalLeagues;
};

import * as portals from "react-reverse-portal";
import { HtmlPortalNode } from "react-reverse-portal/src";
import EventRow from "../eventRow/EventRow";

const EventsPortalsContext = createContext<null | Map<
	number,
	HtmlPortalNode<any>
>>(null);

const useEventsPortalsContext = (): Map<number, HtmlPortalNode<any>> => {
	const eventsPortalsContext = useContext(EventsPortalsContext);
	if (eventsPortalsContext === null)
		throw new Error(
			"useEventsPortalsContext must be used within a EventsPortalsProvider",
		);
	return eventsPortalsContext;
};
const EventsPortals = ({
	events,
	children,
}: {
	events: EventRowType[];
	children: ReactNode;
}) => {
	const portalMap = useMemo(
		() =>
			new Map<number, HtmlPortalNode<any>>(
				events.map((event) => {
					return [event.id, portals.createHtmlPortalNode()];
				}),
			),
		[],
	);

	return (
		<EventsPortalsContext.Provider value={portalMap}>
			{events.map((event) => (
				<portals.InPortal node={portalMap.get(event.id)!}>
					<EventRow key={event.id} {...event} />
				</portals.InPortal>
			))}

			{children}
		</EventsPortalsContext.Provider>
	);
};

export const EventOutPortal = ({ eventId }: { eventId: number }) => {
	const portalNode = useEventsPortalsContext().get(eventId);
	if (!portalNode) throw new Error("EventOutPortal: portalNode is null");
	return <portals.OutPortal node={portalNode} />;
};

const Livetable: FunctionComponent<LivetableProps> = ({ leagues, events }) => {
	const [sortBy, setSortBy] = useState<"league" | "time">("league");
	const groupedEventsIntoLeagues = getGroupedEventsIntoLeagues(
		events,
		sortBy,
	);

	return (
		<div className="flex flex-col gap-y-4">
			<button
				className="bg-gray-900 text-white px-4 py-2 rounded-md shadow-md mr-auto"
				onClick={() =>
					setSortBy(sortBy === "league" ? "time" : "league")
				}
			>
				Sort by {sortBy === "league" ? "time" : "league"}
			</button>
			<EventsPortals events={events}>
				{[...groupedEventsIntoLeagues.keys()].map((leagueKey) => {
					const leagueEvents = (
						groupedEventsIntoLeagues as Map<
							typeof leagueKey,
							EventRowType[]
						>
					).get(leagueKey);

					if (!leagueEvents) {
						return null;
					}

					const league = leagues.find(
						(l) => l.id === leagueEvents[0].leagueId,
					);

					if (!league) {
						return null;
					}

					return (
						<League
							events={leagueEvents}
							sortBy={sortBy}
							leagueKey={leagueKey}
							{...league}
						/>
					);
				})}
			</EventsPortals>
		</div>
	);
};

export default Livetable;
