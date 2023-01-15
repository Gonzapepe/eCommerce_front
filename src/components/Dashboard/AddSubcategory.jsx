import React, { useState } from "react";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addSubcategory } from "../../redux/reducers/subcategory/subcategory.actions";

const AddSubcategory = () => {
  const [subcategory, setSubcategory] = useState({});
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setSubcategory((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSubcategory(subcategory));
  };
  return (
    <div className=" h-screen flex flex-row ">
      <aside className="w-3/12">
        <DashboardSidebar />
      </aside>
      <Box className="w-9/12" sx={{ mx: "auto" }}>
        <Card sx={{ mt: 10, maxWidth: 300, mx: "auto", padding: 2 }}>
          <Typography
            variant="h5"
            sx={{ mt: 2, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            Añadir Subcategoría
          </Typography>
          <CardContent>
            <TextField
              variant="standard"
              label="Nombre"
              onChange={(e) => handleChange(e)}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => handleSubmit(e)}
            >
              Guardar
            </Button>
            <Button variant="contained" color="error" size="small">
              Limpiar
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default AddSubcategory;
