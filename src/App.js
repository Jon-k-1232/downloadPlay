import React, { useState, useEffect } from 'react';
import './App.css';
import Row from './components/Row/Row';
import inputData from './ArrayData';
import Checkbox from './components/CheckBox/Checkbox';

export default function App() {
	const [downloadableItems, setDownloadableItems] = useState([]);
	const [selectAllObject, setSelectAllObject] = useState([]);
	const [selectedCount, setSelectedCount] = useState(0);
	const [selected, setSelected] = useState([]);
	const [selectedHistory, setSelectedHistory] = useState([]);

	useEffect(() => {
		// Assigning intial values
		inputData.forEach((item, i) => {
			item.id = i;
			item.changeColor = false;
			item.isChecked = false;
		});

		// Creates and object for select all
		setSelectAllObject({
			name: 'Select_All_Button',
			id: inputData.length,
			changeColor: false,
			isChecked: false,
		});

		// Createing a list of items that are available for download
		setDownloadableItems(inputData.filter(item => item.status === 'available'));
	}, []);

	/**
	 * Orchestrator of button action
	 * @param {*} e synthetic click
	 */
	const checkboxOnClickHandler = e => {
		const id = parseInt(e.target.value);
		const selectAllBoxId = selectAllObject.id;

		toggleChecked(e, id);
		updateSelectedCount(e, id, selectAllBoxId);
		changeRowColor(e, id, selectAllBoxId);
		updateSelectAll(e, id, selectAllBoxId);
	};

	/**
	 * Updates object with a Boolean in isChecked key
	 * @param {*} e Orgional synthetic click
	 * @param {*} id const for item from e.target.value
	 */
	const toggleChecked = (e, id) => {
		inputData.forEach(item => {
			if (item.id === id) {
				item.isChecked = e.target.checked;
			}
		});
	};

	/**
	 * Creates an array of active id's and count
	 * @param {*} e Orgional synthetic click
	 * @param {*} id const for item from e.target.value
	 * @param {*} selectAllBoxId Id of length of inputData.
	 */
	const updateSelectedCount = (e, id, selectAllBoxId) => {
		const checked = e.target.checked;

		if (checked && id !== selectAllBoxId) {
			setSelected([...selected, id]);
			setSelectedCount(selectedCount + 1);
		} else if (!checked && id !== selectAllBoxId) {
			const removeItem = selected.indexOf(id);
			selected.splice(removeItem, 1);
			setSelectedCount(selectedCount - 1);
		}
	};

	/**
	 * Changes color of row
	 * @param {*} e Orgional synthetic click
	 * @param {*} id const for item from e.target.value
	 * @param {*} selectAllBoxId Id of length of inputData.
	 */
	const changeRowColor = (e, id, selectAllBoxId) => {
		if (id !== selectAllBoxId) {
			inputData.forEach(item => {
				if (item.id === id) {
					item.changeColor = e.target.checked;
				}
				return item;
			});
		}
	};

	/**
	 * Select all check boxes.
	 * @param {*} e Orgional synthetic click
	 * @param {*} id const for item from e.target.value
	 * @param {*} selectAllBoxId Id of length of inputData.
	 */
	const updateSelectAll = (e, id, selectAllBoxId) => {
		const checked = e.target.checked;

		const objectUpdate = () => {
			inputData.forEach(item => {
				item.changeColor = checked;
				item.isChecked = checked;
			});
		};

		// If Select All is selected
		if (checked && id === selectAllBoxId) {
			setSelectedCount(inputData.length);
			setSelected(inputData.map((item, i) => i));
			setSelectedHistory(selected);
			objectUpdate();

			// Conditions of when Select All is not selected
		} else if (!checked && selectedHistory.length === 0) {
			setSelected([]);
			setSelectedCount(0);
			objectUpdate();
		} else if (!checked && selectedHistory.length >= 1) {
			setSelected(selectedHistory);
			setSelectedCount(selectedHistory.length);

			const deHighlight = inputData.filter(item =>
				selectedHistory.find(ids => item.id !== ids),
			);
			deHighlight.forEach(item => (item.changeColor = checked));
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
					{/* selectAllBoxId in header has id of 5 */}
					<Checkbox
						onClickCallback={e => checkboxOnClickHandler(e)}
						item={selectAllObject}
					/>
					{selectedCount === 0 ? (
						<p>None Selected</p>
					) : (
						<p>Selected {selectedCount}</p>
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
					{inputData &&
						inputData.map((fileItem, i) => (
							<div className='rowContainer' key={i}>
								<Checkbox
									onClickCallback={e => checkboxOnClickHandler(e)}
									item={fileItem}
								/>
								<Row {...fileItem} />
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
