"use client";
import { SnackbarProvider } from "notistack";
import React from "react";
import { SnackbarUtilsConfigurator } from ".";

type Props = {};

const SnackbarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <SnackbarUtilsConfigurator />
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarWrapper;
