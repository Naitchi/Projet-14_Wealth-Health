import { useEffect, useState } from 'react';

// Composant créé pour éviter l'erreur d'hydratation

export default function ClientOnly({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // pendant le rendu côté serveur, ne rien retourner
  }

  return children; // pendant le rendu côté client, retourner les enfants
}
