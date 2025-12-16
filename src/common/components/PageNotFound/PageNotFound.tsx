import styles from "./PageNotFound.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import Box from "@mui/material/Box"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Box display={'flex'} justifyContent={'center'}>
    <Button component={Link} to={'/'} color={'primary'} variant={'contained'} sx={{width: 400}}>Return to home page</Button>
    </Box>
  </>
)