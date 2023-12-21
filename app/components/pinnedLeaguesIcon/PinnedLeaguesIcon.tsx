type PinnedLeaguesIconProps = {
	id: number;
};

const PinnedLeaguesIcon = ({ id }: PinnedLeaguesIconProps) => {
	return <button className={`hover:opacity-75 "opacity-25"`}>📌</button>;
};

export default PinnedLeaguesIcon;
