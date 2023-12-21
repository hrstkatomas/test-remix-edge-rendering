import classNames from "classnames";

import { useLeagueAtom } from "../leagueContext/LeagueContext";

type MyLeaguesIconProps = {
	id: number;
};

const MyLeaguesIcon = ({ id }: MyLeaguesIconProps) => {
	const { hasLeagueIconHover, setLeagueIconHover } = useLeagueAtom();

	return (
		<button
			className={classNames("hover:opacity-75")}
			onMouseEnter={() => setLeagueIconHover(true)}
			onMouseLeave={() => setLeagueIconHover(false)}
		>
			⭐
		</button>
	);
};

export default MyLeaguesIcon;
