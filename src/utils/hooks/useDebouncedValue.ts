import { useEffect, useState } from "react";

/**
 * Devolve `value` com um atraso. Usado pra busca: o input atualiza na
 * hora (sensação de digitação instantânea), mas a requisição só dispara
 * `delay` ms depois que o usuário parar de digitar.
 */
export function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
