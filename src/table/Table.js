import React from 'react'

//Просто пример компонента который встраивается в таблицу
const Small = ({sort}) => (
	<small>{sort}</small>
)


export default props => (

	<table className="table">
		<thead>
			<tr>
				<th onClick={props.onSort.bind(null, 'id')} scope="col">
					#ID
					{
						props.sortField === 'id'
							? <Small sort={props.sort}/>
							: null
					}
				</th>
				<th onClick={props.onSort.bind(null, 'firstName')} scope="col">
					First name
					{
						props.sortField === 'firstName'
							? <small>{props.sort}</small>
							: null
					}
				</th>
				<th onClick={props.onSort.bind(null, 'lastName')} scope="col">
					Last name
					{
						props.sortField === 'lastName'
							? <small>{props.sort}</small>
							: null
					}
				</th>
				<th onClick={props.onSort.bind(null, 'email')} scope="col">
					Email
					{
						props.sortField === 'email'
							? <small>{props.sort}</small>
							: null
					}
				</th>
				<th onClick={props.onSort.bind(null, 'phone')} scope="col">
					Phone
					{
						props.sortField === 'phone'
							? <small>{props.sort}</small>
							: null
					}
				</th>
			</tr>
		</thead>

		<tbody>
			
			{
				//ЧТобы сформировать уникальный ключ пишем item.id + item.phone
				props.data.map(item => (
				<tr key={item.id + item.phone} onClick={props.onRowSelect.bind(null, item)}>
					<td>{item.id}</td>
					<td>{item.firstName}</td>
					<td>{item.lastName}</td>
					<td>{item.email}</td>
					<td>{item.phone}</td>
				</tr>
			))}

		</tbody>

	</table>

)