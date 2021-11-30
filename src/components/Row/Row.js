import './Row.css';

// Changes color of row when selected
const getColor = changeColor => {
	if (changeColor) return '#2196f3';
	return '';
};

export default function Row(props) {
	const { name, device, path, status, changeColor } = props;

	return (
		<div className='row' style={{ color: getColor(changeColor) }}>
			<p id='name'>{name}</p>
			<p id='device'>{device}</p>
			<p id='path'>{path}</p>
			{status === 'available' ? (
				<div className='activeContainer'>
					<span id='coloredCircle'> </span>
					<p id='activeIndicator'>{status}</p>
				</div>
			) : (
				<p id='inactiveIndicator'>{status}</p>
			)}
		</div>
	);
}
