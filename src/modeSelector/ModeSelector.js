import React from 'react'

export default props => {

	const afewRowsUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

	const alotRowsUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

	return (
		<div style={{display: 'flex', justifyContent: 'center', padding: '50px 0'}}>
			<button onClick={() => props.onSelect(afewRowsUrl)} className="btn btn-sussecc">Загрузить 32 строки</button>
			<button onClick={() => props.onSelect(alotRowsUrl)} className="btn btn-danger">Загрузить 1000 строк</button>
		</div>
	)

}