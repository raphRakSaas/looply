import { redirect } from "next/navigation";

/**
 * Page racine : redirection vers la page de connexion.
 * Une landing dédiée pourra remplacer ce redirect plus tard.
 */
export default function Home() {
  redirect("/login");
}
