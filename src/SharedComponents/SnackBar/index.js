import { amber, blue, green } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import SnackbarContent from '@mui/material/SnackbarContent'
import Typography from '@mui/material/Typography'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideSnackbar } from '../../Redux/SnackBar/actions'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'

const StyledSnackbar = styled(Snackbar)(({ theme, variant }) => ({
  '& .FuseMessage-content': {
    ...(variant === 'success' && {
      backgroundColor: green[600],
      color: '#FFFFFF',
    }),

    ...(variant === 'error' && {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.getContrastText(theme.palette.error.dark),
    }),

    ...(variant === 'info' && {
      backgroundColor: blue[600],
      color: '#FFFFFF',
    }),

    ...(variant === 'warning' && {
      backgroundColor: amber[600],
      color: '#FFFFFF',
    }),
  },
}))

const variantIcon = {
  success: <CheckCircleOutlineIcon />,
  warning: <PriorityHighIcon />,
  error: <ErrorOutlineIcon />,
  info: <InfoIcon />,
}

function SnackbarMessage(props) {
  const dispatch = useDispatch()
  const snackbar = useSelector((state) => state?.snackbar)
  const { state, options } = snackbar

  return (
    <StyledSnackbar
      {...options}
      open={state}
      onClose={() => dispatch(hideSnackbar())}
      ContentProps={{
        variant: 'body2',
        headlineMapping: {
          body1: 'div',
          body2: 'div',
        },
      }}
    >
      <SnackbarContent
        className="FuseMessage-content"
        message={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {variantIcon[options.variant] && (
              <Icon color="inherit">{variantIcon[options.variant]}</Icon>
            )}
            <Typography className="mx-8" style={{ color: '#fff' }}>
              {options.message}
            </Typography>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(hideSnackbar())}
            size="large"
          >
            <Icon>
              <CloseIcon />
            </Icon>
          </IconButton>,
        ]}
      />
    </StyledSnackbar>
  )
}

export default memo(SnackbarMessage)
