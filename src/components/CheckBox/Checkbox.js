import { useState } from 'react';
import inputData from '../../ArrayData';
import './Checkbox.css';

export default function Checkbox({ onClickCallback, item }) {
	const [autoSelected, setAutoSelected] = useState(false);

	const selectAllVerification = e => {
		const checked = e.target.checked;
		const id = parseInt(e.target.value);
		const selectAllBoxId = inputData.length;

		if (id === selectAllBoxId) setAutoSelected(checked);
	};

	return (
		<form className='checkboxContainer'>
			<input
				type='checkbox'
				onClick={e => onClickCallback(e)}
				checked={autoSelected ? autoSelected : item.isChecked}
				id={item.id}
				value={item.id}
				name={item.name}
				onChange={e => selectAllVerification(e)}
			/>
		</form>
	);
}
