const components = {
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: "15px !important",
        paddingRight: "15px !important",
        maxWidth: "1600px",
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none" as const,
        boxShadow: "none",
        fontSize: "15px",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        // color: "white",
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "20px",
        padding: "14px",
        margin: "15px",
        boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
      },
    },
  },
};

export default components;
