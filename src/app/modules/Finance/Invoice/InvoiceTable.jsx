import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material/styles'

import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const InvoiceTable = () => {
  const history = useHistory()

  const onRowClick = (data) => {
    console.log('hello')
  }

  const columns = [
    {
      name: 'Invoice ID', options: {
        filterOptions: { fullWidth: true },
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Student ID', options: {
        filterOptions: { fullWidth: true },
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Student Name', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Course ID', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Class ID', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Created Date', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Invoice Deadline', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        }
      }
    },
    {
      name: 'Paid Date', options: {
        customHeadLabelRender: (columnMeta) => {
          return <div style={{ marginLeft: '-16px' }}>{columnMeta.label}</div>
        },
        customBodyRender: (label) => {
          if (!label)
            return <div className='flex'><div className={`px-3 text-11 py-3px border-radius-4 text-white bg-error mr-3`}>Unpaid</div></div>
          return label
        }
      }
    },
    {
      name: 'Note', options: {
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
    ['INV-01', 'STU-01', 'Tan Huu Toan', 'IE50', 'IE50.1', '05-10-2021', '05-11-2021', '26-10-2021', ''],
    ['INV-02', 'STU-02', 'Tan Huu Toan', 'IE50', 'IE50.1', '05-10-2021', '05-11-2021', '27-10-2021', ''],
    ['INV-03', 'STU-03', 'Tan Huu Toan', 'IE60', 'IE60.1', '05-10-2021', '05-11-2021', '01-11-2021', ''],
    ['INV-04', 'STU-04', 'Tan Huu Toan', 'IE60', 'IE60.1', '05-10-2021', '05-11-2021', '', ''],
    ['INV-05', 'STU-05', 'Tan Huu Toan', 'IE70', 'IE70.1', '05-10-2021', '05-11-2021', '', ''],
    ['INV-06', 'STU-06', 'Tan Huu Toan', 'IE70', 'IE70.1', '05-10-2021', '05-11-2021', '', ''],
  ]

  return (
    <ThemeProvider theme={createTheme()}>
      <MUIDataTable
        title={'Invoices List'}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}

export default InvoiceTable
