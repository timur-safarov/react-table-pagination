import React from 'react';
import Pagination from "react-js-pagination";
import Loader from './loader/Loader'
import Table from './table/Table'
import _ from 'lodash'
import DetailRowView from './detailRowView/DetailRowView'
import ModeSelector from './modeSelector/ModeSelector'
import TableSearch from './tableSearch/TableSearch'


class App extends React.Component {

  state = {
    isModeSelected: false,
    isLoading: false,
    search: '',
    data: [],
    sort: 'asc', //desc
    sortField: 'id',
    row: null,
    currentPage: 1
  }

  async fetchData(url) {

    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    });

  }

  onSort = sortField => {
    const clonedData = this.state.data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';

    //Вызываем метод библиотеки lodash
    const data = _.orderBy(clonedData, sortField, sort);

    this.setState({
        //Так как ключ и значение совподают значение мы не пишем
        data,
        sort,
        sortField
    });
  }

  onRowSelect = row => {
    this.setState({row});
  }

  modeSelectHandler = url => {

    this.setState({
      isModeSelected: true,
      isLoading: true
    });

    this.fetchData(url);

  }

  pageChangeHandler(selected) {
    this.setState({currentPage: selected});
    //console.log(selected);
  }

  searchHandler = search => {
    //Указываем поисковое слово и сбрасываем на первую страничку
    this.setState({search, currentPage: 1})
  }

  getFilteredData() {
    const {data, search} = this.state;

    if (!search) {
      return data;
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase().trim())
            || item['lastName'].toLowerCase().includes(search.toLowerCase().trim())
            || item['email'].toLowerCase().includes(search.toLowerCase().trim())
    });

  }


  render() {

    const pageSize = 50;
  
    const filteredData = this.getFilteredData();

    const itemCount = parseInt(filteredData.length);

    //используем chunk из библиотеки lodash
    //currentPage - 1 потому что lodash высчитывает первую страницу с 0
    //а react-js-pagination с 1
    const displayData = itemCount > pageSize
          ?  _.chunk(filteredData, pageSize)[this.state.currentPage - 1]
          : filteredData;

    if (!this.state.isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }

    return (
      <div className="container">
        {
          this.state.isLoading
            ? <Loader />
            : 
              <React.Fragment>
                <TableSearch
                  onSearch={this.searchHandler}
                />
                <Table
                  data={displayData}
                  onSort={this.onSort}
                  sort={this.state.sort}
                  sortField={this.state.sortField}
                  onRowSelect={this.onRowSelect}
                />
              </React.Fragment>


        }

        {
          itemCount > pageSize
            ?
              <Pagination
                innerClass="pagination"
                prevPageText="prev"
                nextPageText="next"
                firstPageText="first"
                lastPageText="last"
                itemClassPrev="page-item"
                itemClassNext="page-item"
                itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.currentPage}
                itemsCountPerPage={pageSize}
                totalItemsCount={itemCount}
                pageRangeDisplayed={5}
                onChange={this.pageChangeHandler.bind(this)}
              />
            : null
        }

        {
          this.state.row
            ? <DetailRowView person={this.state.row}/>
            : null
        }
        
      </div>
    );

  }


}

export default App;
