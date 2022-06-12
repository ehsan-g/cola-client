import { CircularProgress } from "@mui/material";
import  { Suspense } from "react";
import  { FC } from 'react';


const Loadable = (Component: FC) => (props: any) =>
  (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
