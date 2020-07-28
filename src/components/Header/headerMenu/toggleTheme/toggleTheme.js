import React, { useContext } from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Brightness5, Brightness4 } from "@material-ui/icons";
import { useTheme } from "@material-ui/core";
import { ThemeContext } from "../../../../themes/ThemeProvider";

const ToggleTheme = ({ handleClose }) => {
  const setTheme = useContext(ThemeContext);
  const theme = useTheme();
  const handleThemeToggle = () => {
    theme.palette.type === "light"
      ? setTheme("darkTheme")
      : setTheme("lightTheme");
    handleClose();
  };

  return (
    <MenuItem onClick={handleThemeToggle}>
      <ListItemIcon>
        {theme.palette.type === "light" ? <Brightness4 /> : <Brightness5 />}
      </ListItemIcon>
      <ListItemText primary="Light/Dark Theme" />
    </MenuItem>
  );
};

export default ToggleTheme;
