import MyGamesIcon from "../myGamesIcon/MyGamesIcon";

import type { FunctionComponent } from "react";
import { ProgressiveClientOnly } from "~/components/progressiveClientOnly/ProgressiveClientOnly";
export type EventRowType = {
	id: number;
	home: string;
	away: string;
	startTime: Date;
	leagueId: number;
};

const EventRow: FunctionComponent<EventRowType> = ({
	id,
	home,
	away,
	startTime,
}) => {
	return (
		<div className="flex flex-row">
			<div className="w-1/12 text-center">
				<MyGamesIcon id={id} />
			</div>
			<div className="w-1/12 text-center">
				<ProgressiveClientOnly>
					{startTime.toLocaleTimeString("cs").replace(/:00$/, "")}
				</ProgressiveClientOnly>
			</div>
			<h3 className="w-5/12">
				<strong>{home}</strong> - <strong>{away}</strong>
			</h3>
			{/*{liveData && (*/}
			{/*	<div className="w-5/12">*/}
			{/*		{liveData.homeGoals} - {liveData.awayGoals}*/}
			{/*	</div>*/}
			{/*)}*/}
		</div>
	);
};

export default EventRow;
