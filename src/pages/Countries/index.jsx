import React, { useCallback, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
// import ReactJson from 'react-json-view';
import { useWorldCountries } from 'redux/selectorHooks';
import { useDispatch } from 'react-redux';
import { prepareDataAction, executeDataAction } from 'redux/actions';
import { group3 } from 'functions';
import { Trans } from 'locales/Trans';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps, 
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
		usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup,i) => (
            <tr key={i}{...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column,i) => (
                <th key={i} {...column.getHeaderProps()}><Trans>{column.render('Header')}</Trans></th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr key={row.country_name} {...row.getRowProps()}>
                {row.cells.map((cell,i) => {
                  return <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select className="selectPage"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize,i) => (
            <option key={i} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
			{/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  )
}

const countryClick = (ev) => {
	window.location.href = '#/country_chart/'+ev;
}

function CountriesTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Countries',
        columns: [
          {
						Header: 'Country name',
						accessor: n => (
							<div className='isLink' name={n.country_name} onClick={() => countryClick(n.country_name)}>{n.country_name}</div>
						)
					},
          {
						Header: 'Total Cases',
						accessor: n => (
							<div className='rightAlign'>{group3(n.cases)}</div>
						)
					},
					{
						Header: 'New Cases',
						accessor: n => (
							<div className='rightAlign'>{group3(n.new_cases)}</div>
						)
				 },
          {
            Header: 'Total Deads',
						accessor: n => (
							<div className='rightAlign'>{group3(n.deaths)}</div>
						)
          },
					{
						Header: 'New Deaths',
						accessor: n => (
							<div className='rightAlign'>{group3(n.new_deaths)}</div>
						)
				 },
				 {
            Header: 'Critical cases',
						accessor: n => (
							<div className='rightAlign'>{group3(n.active_cases)}</div>
						)
          },
          {
            Header: 'Recovered',
						accessor: n => (
							<div className='rightAlign'>{group3(n.total_recovered)}</div>
						)
					},
        ],
      },
    ],
    []
  )
	const dispatch = useDispatch();
	const worldCountries = useWorldCountries();

	const reLoad = useCallback(() => {
		dispatch(prepareDataAction({ dataSet: "worldCountries", dataAction:"fetch"}))
		dispatch(executeDataAction("worldCountries"));
	},[dispatch]);

	useEffect(() => {
		reLoad();
	}, [dispatch, reLoad]);

  return (
    <div className='page'>
      <Table columns={columns} data={worldCountries} />
			{/* <ReactJson src={tetra} /> */}
    </div>
  )
}

export default CountriesTable
