import React, {useState} from 'react'

export default props => {

	//Исопльзуем хуки риакта
	const [value, setValue] = useState('');

	const valueChangeHandler = event => {
		setValue(event.target.value)
	}


	return (

		<div className="input-group mb-3 mt-3">
		  <div className="input-group-prepend">
		    <button className="btn btn-outline-primary"
		    	onClick={() => props.onSearch(value)}
		    >
		    	Search
		    </button>
		  </div>
		  <input type="text" className="form-control" value={value} onChange={valueChangeHandler} />
		</div>

	)

}