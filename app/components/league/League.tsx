import type { LeagueType } from "../livetable/Livetable";
import type { EventRowType } from "../eventRow/EventRow";

import EventRow from "../eventRow/EventRow";
import { LeagueProvider } from "../leagueContext/LeagueContext";
import LeagueHeader from "../leagueHeader/LeagueHeader";
import { EventOutPortal } from "../livetable/Livetable";
import React from "react";

interface LeagueProps extends LeagueType {
	leagueKey: number | string;
	sortBy: "league" | "time";
	events: EventRowType[];
}

const League = ({ name, leagueKey, id, sortBy, events }: LeagueProps) => {
	return (
		<div
			key={`${leagueKey}-${sortBy}`}
			className="bg-white rounded-lg px-4 py-2 shadow-sm"
		>
			<LeagueProvider events={events}>
				<LeagueHeader id={id} name={name} />
				<div className="flex flex-col gap-y-2">
					{events.map((event) => (
						<EventOutPortal key={event.id} eventId={event.id} />
					))}
				</div>
			</LeagueProvider>
		</div>
	);
};

export default League;
