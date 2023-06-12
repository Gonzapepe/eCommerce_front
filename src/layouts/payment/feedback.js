import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiM2EwODNmLTlmODQtNGZhMy04ZDMxLTI5OGU1YmJhYWJhMSIsIm5hbWUiOiJgcGVwc2kiLCJlbWFpbCI6InBlcHNpQHRlc3QuY29tIiwicm9sZSI6IlNUQU5EQVJEIiwiY3JlYXRlZF9hdCI6IjIwMjEtMTEtMDlUMjE6NDM6MTIuODIzWiIsImlhdCI6MTY0MzIzNzM5NiwiZXhwIjoxNjQzMjQwMzk2fQ.KHkFyya2qN1YR4pjzN7gm-tNpckpbXAg2pk7sCYgMJU";

export default function Feedback(props) {
  const [status, setStatus] = useState(null);

  const { search } = useLocation();

  console.log(search);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/cart/feedback${search}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `${auth}` },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("RESPUESTA: ", response.data);
        setStatus(response.Status);
      })
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <div>
      <p>Status: {status}</p>
    </div>
  );
}
