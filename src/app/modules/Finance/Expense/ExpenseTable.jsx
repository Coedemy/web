import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'

import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const ExpenseTable = () => {
  const history = useHistory()

  const onRowClick = (data) => {
    console.log(data)
  }

  const columns = [
    {
      name: 'Class ID', options: {
        filterOptions: { fullWidth: true },
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Class Name', options: {
        filterOptions: { fullWidth: true },
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Course Name', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Program', options: {
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
    },
    {
      name: 'Enrolled Student(s)', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Total lessons', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    }
  ]

  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: 'dropdown',
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
    ['APL1B15.1', 'Ielts 5.0/1', 'APL1B15', 'Ielts', 'Basic', 20, 50],
    ['APL1B15.2', 'Ielts 5.0/2', 'APL1B15', 'Ielts', 'Basic', 20, 50],
    ['APL1B15.3', 'Ielts 5.0/3', 'APL1B15', 'Ielts', 'Basic', 20, 50],
    ['APL1B16.1', 'Ielts 5.5/1', 'APL1B17', 'Ielts', 'Intermediate', 20, 50],
    ['APL1B16.2', 'Ielts 5.5/2', 'APL1B17', 'Ielts', 'Intermediate', 20, 50],
    ['APL1B16.3', 'Ielts 5.5/3', 'APL1B17', 'Ielts', 'Intermediate', 20, 50],
    ['APL1B17.1', 'Ielts 6.5/1', 'APL1B17', 'Ielts', 'Advance', 20, 50],
    ['APL1B17.2', 'Ielts 6.5/2', 'APL1B17', 'Ielts', 'Advance', 20, 50],
    ['APL1B18.1', 'Ielts 7.0/1', 'APL1B18', 'Ielts', 'Advance', 20, 50],
    ['APL1B18.2', 'Ielts 7.0/2', 'APL1B18', 'Ielts', 'Advance', 20, 50],
  ]

  return (
    <ThemeProvider theme={createTheme()}>
      <MUIDataTable
        title={'Expenses List'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}

export default ExpenseTable
