import React, { useContext, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { FiShoppingBag } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";

import { Container } from "./styles";
import CurrentStockContent from "../../components/CurrentStockContent";
import NewPurchase from "../../components/newPurchase";
import { SideBarContext } from "../../contexts/SideBarContext";
import Header from "../../components/Header";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface ProductProps {
  id: string;
  name: string;
  value: number;
  quantity: number;
  measureUnit: string;
  costCenter: string;
  stockLimit: number;
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

export default function SimpleTabs() {
  const { open, activePage } = useContext(SideBarContext);
  console.log(activePage);

  const [value, setValue] = React.useState(activePage === 2 ? 1 : 0);
  const [preData, setPreData] = React.useState<ProductProps>();

  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      margin: "0 auto",
      maxWidth: "1000px",
      width: "90%",
      height: value === 0 ? "calc(100vh - 100px)" : "auto",
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

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function changeValue(value: number) {
    setValue(value);
  }

  useEffect(() => {
    setValue(activePage === 2 ? 1 : 0);
  }, [activePage]);

  return (
    <>
      <Header pageName={"Estoque"} />
      <Container open={open}>
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
                icon={<FiShoppingBag fontSize={25} />}
              />
              <Tab
                label="Nova Compra"
                style={{
                  color: value === 1 ? "#6558f5" : "#000",
                  textTransform: "none",
                }}
                icon={
                  <MdAddShoppingCart
                    fontSize={25}
                    color={value === 1 ? "#6558f5" : "#000"}
                  />
                }
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <CurrentStockContent
              setPreData={setPreData}
              changeValue={changeValue}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NewPurchase preData={preData} changeValue={changeValue} />
          </TabPanel>
        </div>
      </Container>
    </>
  );
}
