import { Suspense } from "react";

import Cargando from "./components/cargando";
import ModeloPala from "./components/model";

export default function Pala() {
  return (
    <Suspense
      fallback={
        <Cargando/>
      }
    >
      <ModeloPala/>
    </Suspense>
  );
}
