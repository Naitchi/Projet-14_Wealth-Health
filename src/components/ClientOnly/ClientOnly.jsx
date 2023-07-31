/**
 * Module dependencies.
 */
import { useEffect, useState } from 'react';

/**
 * Component used to avoid hydration error.
 *
 * This component ensures that certain parts of the app are only rendered
 * on the client-side, preventing issues where the server-side rendered output
 * does not match the client-side rendering.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The children components to be rendered.
 * @returns {React.ReactNode} - The children components if on the client-side, else null.
 */
export default function ClientOnly({ children }) {
  // State variable to track whether currently rendering on the client-side
  const [isClient, setIsClient] = useState(false);

  /** Update isClient state to true once component has mounted
   *  (i.e., on the client - side)
   */
  useEffect(() => {
    setIsClient(true);
  }, []);

  // During server-side rendering, return nothing
  if (!isClient) {
    return null;
  }

  // During client-side rendering, return the children
  return children;
}
