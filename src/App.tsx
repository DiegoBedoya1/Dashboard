//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Grid } from "@mui/material";
import './App.css';
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import SelectorUI from "./components/SelectorUI";
import IndicatorUI from "./components/IndicatorUI";
import useFetchData from "./functions/useFetchData";
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import {useState} from "react";


function App() {
  //const [count, setCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string| null>(null);
  const dataFetchOutput = useFetchData(selectedOption);
  //const {data, loading, error} = useFetchData();
   return (

    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

      {/* Alertas */}
      <Grid container justifyContent="right" alignItems="center"><AlertUI description="No se preveen lluvias"/></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3  }}><SelectorUI onOptionSelect={setSelectedOption} ></SelectorUI></Grid>
      

      {/*carga*/}
      {dataFetchOutput.loading && (
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>Cargando datos del clima...</Grid>
      )}
      {/*En caso de error */}
      {dataFetchOutput.error && (
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            {/* uso el componente AlertUI para mostrar el error real */}
            <AlertUI description={`Error recuperando datos: ${dataFetchOutput.error}`} />
        </Grid>
      )}

      {/* Indicadores */}
      {!dataFetchOutput.loading && !dataFetchOutput.error && dataFetchOutput.data && (
        <Grid container size={{ xs: 12, md: 9 }}>
          <Grid size={{ xs: 12, md: 3 }}> 
            <IndicatorUI title='Temperatura (2m)' 
            description={`${dataFetchOutput.data.current.temperature_2m} ${dataFetchOutput.data.current_units.apparent_temperature}`} />
          </Grid> 
          {/*Elemento: Indicadores*/}

          <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title='Apparent Temperature' 
          description={`${dataFetchOutput.data.current.apparent_temperature} ${dataFetchOutput.data.current_units.temperature_2m}`}/>
            {/* IndicatorUI con la Temperatura aparente en °C' */}
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {/* IndicatorUI con la Velocidad del viento en km/h' */}
            <IndicatorUI title='Wind Speed (10 m)' 
            description={`${dataFetchOutput.data.current.wind_speed_10m} ${dataFetchOutput.data.current_units.wind_speed_10m}`}/>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Relative Humidity (2 m)' 
            description={`${dataFetchOutput.data.current.relative_humidity_2m} ${dataFetchOutput.data.current_units.relative_humidity_2m}`}/>
            {/* IndicatorUI con la Humedad relativa en %' */}
          </Grid>
        </Grid>
      )}

      {/* Gráfico */}
      <Grid sx={{ display: { xs: "none", md: "block"} }}> <ChartUI{...dataFetchOutput}/> </Grid>

      {/* Tabla */}
      <Grid sx={{ display: { xs: "none", md: "block" } }}> <TableUI{...dataFetchOutput} /></Grid>

      {/* Información adicional */}
      <Grid>Elemento: Información adicional</Grid>

      

    </Grid>
  )
}

export default App;