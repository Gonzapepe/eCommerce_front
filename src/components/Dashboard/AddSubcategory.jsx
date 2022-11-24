import React from "react";
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

const AddSubcategory = () => {
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
            <TextField variant="standard" label="Nombre" />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" size="small">
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
