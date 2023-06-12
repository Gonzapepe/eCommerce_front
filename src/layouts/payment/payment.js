import React, { useEffect, useState } from "react";
import { useMercadopago } from "react-sdk-mercadopago/lib";

const FORM_ID = "payment-form";

// Token del usuario que se saca del payload de JsonWebToken 123 cambio para mandar
const auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiM2EwODNmLTlmODQtNGZhMy04ZDMxLTI5OGU1YmJhYWJhMSIsIm5hbWUiOiJgcGVwc2kiLCJlbWFpbCI6InBlcHNpQHRlc3QuY29tIiwicm9sZSI6IlNUQU5EQVJEIiwiY3JlYXRlZF9hdCI6IjIwMjEtMTEtMDlUMjE6NDM6MTIuODIzWiIsImlhdCI6MTY0MzIzNzM5NiwiZXhwIjoxNjQzMjQwMzk2fQ.KHkFyya2qN1YR4pjzN7gm-tNpckpbXAg2pk7sCYgMJU";
// function addCheckout() {
// useEffect(() => {
//   if (MercadoPago) {
//     const mp = new MercadoPago("TEST-9e305b7e-f695-41da-8822-323c012c26f1", {
//       locale: "es-AR",
//     });

//     mp.checkout({
//       preference: {
//         id: preferenceId,
//       },
//       render: {
//         container: `#${FORM_ID}`,
//         label: "pagar",
//       },
//     });
//   }
// });

// }

export default function Checkout() {
  const [preferenceId, setPreferenceId] = useState(null);

  // PUBLIC KEY que se saca de mercado pago
  const mp = useMercadopago.v2("TEST-9e305b7e-f695-41da-8822-323c012c26f1", {
    locale: "es-AR",
  });

  useEffect(() => {
    // método GET porque los productos ya están agregados al carrito
    fetch("http://localhost:4000/v1/cart/pay", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `${auth}` },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("RESPUESTA: ", response.data);
        setPreferenceId(response.data);
      });
  }, []);

  useEffect(() => {
    if (mp) {
      mp.checkout({
        preference: {
          id: preferenceId,
        },
        render: {
          // nombre de la clase que va a contener el botón junto al texto que va a tener adentro
          container: ".cho-container",
          label: "Pagar",
        },
      });
    }
  }, [preferenceId, mp]);
  console.log(preferenceId);

  return (
    <div>
      <button id={FORM_ID} method="GET" className="cho-container" />
    </div>
  );
}
