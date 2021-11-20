import React from 'react'
import { useHistory } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'

const StudentsInClass = () => {
  const history = useHistory()

  const onRowClick = (data) => {
    console.log('hello')
  }

  const columns = [
    {
      name: 'Course Title', options: {
        filterOptions: { fullWidth: true },
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Course Code', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Learning Level', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    }
  ]

  const options = {
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    filterType: 'dropdown',
    selectableRows: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [5],
    elevation: 0,
    responsive: 'vertical',
    tableBodyHeight: '100%',
    tableBodyMaxHeight: '',
    onTableChange: (action, state) => {
      console.log(action)
      console.dir(state)
    },
    onRowClick: onRowClick
  }

  const data = [
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance'],
    ['Ielts 7.0', 'APL1B15', 'Advance']
  ]

  return (
    <ThemeProvider theme={createTheme()}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}

export default StudentsInClass
