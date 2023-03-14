import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(({ users }) => users)

  return (
    <div>
      <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary' }}>
        Users
      </Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}> {user.username}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default UserList
