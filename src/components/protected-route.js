import { Navigate } from "react-router-dom";
import { auth } from "../routes/firebase.ts";

export default function ProdectedRoute({
  children,
}: {
  children: React.ReactNode,
}) {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}
