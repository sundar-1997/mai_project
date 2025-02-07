import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    "& .MuiButtonBase-root": {
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: theme.palette.custom.main,
        color: "#fff",
      },
    },
    overflow: "hidden",
  },
  chatList:{
    backgroundImage: 'url("assets/images/blur_back.jpg")',
    backdropFilter: "blur(5px)",
  },
  Chatfont:{
    background:"#15168a",
    color: "#fff",
    padding: 8,
    borderRadius: 16,
  },  
  // loginWrapper: {
  //   alignItems: "center",
  // },
  gridFields: {
    width: "100%",
    paddingBlock: 8,
  },
  logo: {
    width: 109,
    height: 69,
    background:"#15168a",
    padding:8,
    objectFit: "cover",
  },
  forgotPassWordLabel: {
    alignSelf: "center",
  },
  forgotLabel: {
    cursor: "pointer",
    opacity: 0.8,
    fontSize: 30,
    paddingBlock: 4,
  },
  password: {
    "&.MuiSvgIcon-root": {
      cursor: "pointer",
    },
  },
  loginPageImage: {
    width: "100%",
    height: "100vh",
    objectFit: "cover",
    position: "relative",
  },

  loginImageContainer: {
    position: "relative",
  },
  overlayText: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    flexDirection: "column",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    padding: "10px",
  },
  gridContainer: {
    display: "flex",
    padding: "30px",
    flexDirection: "column",
    alignItems: "start",
  },
  gridItem: {
    flex: "1",
  },
  boldText: {
    fontSize: "52px",
    fontWeight: "bold",
  },
  highlightText: {
    color: "#c4c4c4",
    fontSize: "32px",
  },
  highlightTextBig: {
    color: "#c4c4c4",
    fontSize: "52px",
  },
}));

export default useStyles;
