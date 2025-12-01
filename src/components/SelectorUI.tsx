import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {type SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";

export default function SelectorUi(){
    const [cityInput,setCityInput] = useState("");

    const handleChange = (event: SelectChangeEvent<string>) => {
    setCityInput(event.target.value as string);
};
    const handleClick = () => {
        alert("click");
    }
    return (
        <FormControl fullWidth>
            <InputLabel id = "city-select-label"> ciudad</InputLabel>
            <Select
            labelId = "city-select-label"
            id = "city-simple-select"
            label = "ciudad"
            value = {cityInput}
            onClick = {handleClick}
            onChange = {handleChange}
            >
                <MenuItem disabled> <em> Seleccione una ciudad</em></MenuItem>
                <MenuItem value = {"guayaquil"}>Guayaquil</MenuItem>
                <MenuItem value = {"quito"}>Quito</MenuItem>
                <MenuItem value = {"cuenca"}>Cuenca</MenuItem>
                <MenuItem value = {"manta"}>Manta</MenuItem>
            </Select>
            {cityInput && (
            <p>
                Información del clima en <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{cityInput}</span>
            </p>
        )}
        </FormControl>
    )
}