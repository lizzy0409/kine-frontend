import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Sidebar from "../../components/Sidebar";

import { FiCoffee } from "react-icons/fi";

import { Container } from "./styles";
import CurrentStockContent from "../../components/CurrentStockContent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto",
    maxWidth: "1000px",
    width: "90%",
    height: "calc(100vh - 40px)",
    border: "2px solid #C3CFD9",
    padding: 0,
  },
  tabs: {
    backgroundColor: "#fff",
    color: "#000",
  },
  indicator: {
    backgroundColor: "#6558f5",
    height: "3px",
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Sidebar open={true} />
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            className={classes.tabs}
            classes={{
              indicator: classes.indicator,
            }}
            variant="fullWidth"
          >
            <Tab
              label="Estoque atual"
              style={{
                color: value === 0 ? "#6558f5" : "#000",
                textTransform: "none",
              }}
              icon={<FiCoffee fontSize={25} />}
            />
            <Tab
              label="Nova Compra"
              style={{
                color: value === 1 ? "#6558f5" : "#000",
                textTransform: "none",
              }}
              icon={
                <FiCoffee
                  fontSize={25}
                  color={value === 1 ? "#6558f5" : "#000"}
                />
              }
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <CurrentStockContent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </div>
    </Container>
  );
}
