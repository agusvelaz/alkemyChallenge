import React from 'react'
import { Box } from "@mui/material";

const loader ={
  height:"100vh",
  zIndex:"99999999999"
}


export default function Loader() {
  return (
    <Box sx={loader}>Loader</Box>
  )
}
