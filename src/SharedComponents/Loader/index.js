import React from 'react'
import { Dialog, DialogContent, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-scrollPaper': {
      background: 'none',
    },
    '& .MuiDialog-paper': {
      background: '#fff',
      boxShadow: 'none',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16,
    '& .MuiCircularProgress-svg': {
      color: 'red',
    },
  },
  loaderTxt: {
    paddingBlock: 8,
  },
}))

const Loader = () => {
  const classes = useStyles()
  const loader = useSelector((state) => state?.Loader)
  const { showLoader, loaderTxt } = loader

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={showLoader}
      className={classes.root}
      aria-labelledby="Loader Popup"
    >
      <DialogContent>
        <div className={classes.container}>
          <Typography className={classes.loaderTxt} variant="subtitlte2">
            {loaderTxt}
          </Typography>
          <CircularProgress />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Loader
