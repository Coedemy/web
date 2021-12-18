import React, { useState } from 'react'
import { TextField, Icon } from '@mui/material'

const SearchBar = ({ search }) => {

  const [searchKeyword, setSearchKeyword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    search(searchKeyword)
    setSearchKeyword('')
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        variant='outlined'
        placeholder='Find a product'
        size='small'
        fullWidth
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        InputProps={{
          startAdornment: (
            <Icon className='mr-3' fontSize='small'>
              search
            </Icon>
          ),
        }}
      />
    </form>
  )
}

export default SearchBar
