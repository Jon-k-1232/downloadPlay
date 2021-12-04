import React, { useState, useEffect } from 'react';
import './App.css';
import Row from './components/Row/Row';
import inputData from './ArrayData';
import Checkbox from './components/CheckBox/Checkbox';

export default function App() {
	const [downloadableItems, setDownloadableItems] = useState([]);
	const [selectAll, setSelectAll] = useState(false);
	const [selected, setSelectedItems] = useState([]);
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(inputData);
		setDownloadableItems(list.filter(item => item.status === 'available'));
	}, [list]);

	/**
	 * Selects all onClick and calls for rowColorChange()
	 * @param {*} e takes in synthetic click event
	 */
	const handleSelectAll = e => {
		setSelectAll(!selectAll);
		setSelectedItems(list.map(li => li.id));

		changeRowColor(e);

		if (selectAll) {
			setSelectedItems([]);
		}
	};

	/**
	 * Selects correct checkbox onClick and calls for rowColorChange()
	 * @param {*} e takes in synthetic click event
	 */
	const handleClick = e => {
		const { checked } = e.target;
		const id = parseInt(e.target.id);

		setSelectedItems([...selected, id]);

		changeRowColor(e);

		if (!checked) {
			setSelectedItems(selected.filter(item => item !== id));
		}
	};

	/**
	 * Updates row color change for row click and select all click
	 * @param {*} e takes in synthetic click event
	 */
	const changeRowColor = e => {
		const { checked } = e.target;
		const id = parseInt(e.target.id);

		if (id === list.length) {
			list.forEach(item => (item.changeColor = checked));
		} else {
			list.forEach(item => {
				if (item.id === id) {
					item.changeColor = checked;
				}
				return item;
			});
		}
	};

	/**
	 * On click handler compares selected items to available items and allows only
	 * available items to download.
	 */
	const downloadHandler = () => {
		const downloads = selected
			.map(item => downloadableItems.find(allowed => allowed.id === item))
			.filter(item => item !== undefined);

		downloads.length !== 0
			? alert(downloads.map(item => item.device + '\n' + item.path + '\n'))
			: alert('Nothing to download. Make selection from available items.');
	};

	return (
		<div className='App'>
			<div className='menuContainer'>
				<header>
					<Checkbox
						type='checkbox'
						name='selectAll'
						id={list.length}
						handleClick={handleSelectAll}
						isChecked={selectAll}
					/>
					{selected === 0 ? (
						<p>None Selected</p>
					) : (
						<p>Selected {selected.length}</p>
					)}
					<button onClick={downloadHandler}>Download Selected</button>
				</header>
				<div className='columnLabels'>
					<p id='nameLabel'>Name</p>
					<p id='deviceLabel'>Device</p>
					<p id='pathLabel'>Path</p>
					<p id='statusLabel'>Status</p>
				</div>
				<div className='lowerDiv'>
					{/* If no data, component will not render */}
					{list.map((fileItem, i) => (
						<div className='rowContainer' key={i}>
							<Checkbox
								key={i}
								type='checkbox'
								name={fileItem.name}
								id={fileItem.id}
								handleClick={handleClick}
								isChecked={selected.includes(i)}
							/>
							<Row {...fileItem} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
