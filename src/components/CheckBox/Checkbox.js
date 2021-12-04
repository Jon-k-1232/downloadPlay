import './Checkbox.css';

export default function Checkbox({ id, type, name, handleClick, isChecked }) {
	return (
		<form className='checkboxContainer'>
			<input
				id={id}
				name={name}
				type={type}
				onChange={handleClick}
				checked={isChecked}
			/>
		</form>
	);
}
