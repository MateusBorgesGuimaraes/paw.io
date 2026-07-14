import { useEffect, useRef, useState } from "react";

import styles from "./OwnerPicker.module.css";
import type { OwnerTable } from "../../../owners/utils/types";
import { useDebouncedValue } from "../../../../utils/hooks/useDebouncedValue";
import { useGetOwners } from "../../hooks/useGetOwners";

interface OwnerPickerProps {
  value?: number;
  onChange: (ownerId: number | undefined) => void;
  label?: string;
  requerid?: boolean;
  error?: string;
  description?: string;
  defaultOwner?: OwnerTable;
}

export function OwnerPicker({
  value,
  onChange,
  label,
  requerid,
  error,
  description,
  defaultOwner,
}: OwnerPickerProps) {
  const [selectedOwner, setSelectedOwner] = useState<OwnerTable | null>(
    defaultOwner ?? null,
  );
  const [searchInput, setSearchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const { data: response } = useGetOwners(
    debouncedSearch,
    1,
    debouncedSearch.length > 0,
  );
  const results = debouncedSearch.length > 0 ? (response?.data ?? []) : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(owner: OwnerTable) {
    setSelectedOwner(owner);
    onChange(owner.id);
    setSearchInput("");
    setIsOpen(false);
  }

  function handleClear() {
    setSelectedOwner(null);
    onChange(undefined);
  }

  return (
    <div className={styles.box} ref={containerRef}>
      {label && (
        <label>
          {label} {requerid && <span className={styles.req}>*</span>}{" "}
        </label>
      )}

      <div className={styles.selectedBox}>
        {selectedOwner ? (
          <div className={styles.selectedInfo}>
            <div>
              <strong>{selectedOwner.name}</strong>
              <p>{selectedOwner.phone}</p>
            </div>
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
            >
              Trocar
            </button>
          </div>
        ) : (
          <p className={styles.emptyState}>Nenhum tutor selecionado</p>
        )}
      </div>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Buscar tutor por nome ou telefone..."
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && searchInput.length > 0 && (
          <ul className={styles.results}>
            {results.length === 0 && (
              <li className={styles.resultEmpty}>Nenhum tutor encontrado</li>
            )}
            {results.map((owner) => (
              <li key={owner.id}>
                <button type="button" onClick={() => handleSelect(owner)}>
                  <strong>{owner.name}</strong>
                  <span>{owner.phone}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {description && !error && <p className={styles.desc}>{description}</p>}
      {error && <p className={styles.err}>{error}</p>}
    </div>
  );
}
