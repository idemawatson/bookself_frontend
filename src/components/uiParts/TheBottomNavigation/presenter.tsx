import { MenuBook, PermIdentity, Search } from '@mui/icons-material'
import { Paper } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useEffect, useState, FC } from 'react'

type Props = {
  value: string
  handleChange: (event: React.SyntheticEvent, newValue: string) => void
}
const LabelBottomNavigation: FC<Props> = ({ value, handleChange }) => {
  const [routeName, setRouteName] = useState('/games')
  useEffect(() => {
    setRouteName(value.split('/')[1])
  }, [value])
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
      <BottomNavigation sx={{ width: '100%' }} value={routeName} onChange={handleChange}>
        <BottomNavigationAction label='本棚' value='shelf' icon={<MenuBook />} />
        <BottomNavigationAction label='さがす' value='search' icon={<Search />} />
        <BottomNavigationAction label='フォロー' value='follow' icon={<PermIdentity />} />
      </BottomNavigation>
    </Paper>
  )
}

export default LabelBottomNavigation
