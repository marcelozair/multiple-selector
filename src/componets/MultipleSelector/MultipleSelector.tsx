import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Customer } from '../../constants/customers';
import './MultipleSelector.css';
import classNames from 'classnames';


type EventChangeInput = React.ChangeEvent<HTMLInputElement>

export interface Option<T> {
  value: T;
  label: string;
}

interface MultipleSelectorProps {
  options: Option<Customer>[]
}

export const MultipleSelector: React.FC<MultipleSelectorProps> = ({
  options,
}) => {
  const [results, setResults] = useState<Option<Customer>[]>([]);
  const [selected, setSelected] = useState<Customer[]>([])
  const [show, setShow] = useState(false)

  const multipleSelectorRef = useRef<HTMLDivElement>(null);
  const multipleSelectorInputRef = useRef<HTMLInputElement>(null);

  const selectedIds = useMemo(() => selected.map(({ id }) => id), [selected]);

  const onSelect = (option: Customer) => {
    setSelected([...selected, option]);
    setResults([]);
    setShow(false);

    if (multipleSelectorInputRef.current) {
      multipleSelectorInputRef.current.value = '';
    }
  }

  const onSearch = (e: EventChangeInput) => {
    const { value } = e.target;

    if (!value && results.length > 0) return setResults([])

    const regexSearch = new RegExp(value, 'i')

    setResults(options.filter(({ label, value }) => {
      return regexSearch.test(label) && !selectedIds.includes(value.id);
    }));
  }

  const onRemove = (index: number) => {
    const newSelected = [...selected];
    newSelected.splice(index, 1);

    setSelected(newSelected);
  }

  const handleShow = (value: boolean) => {
    setShow(value);
  }

  const renderOptions = () => (
    results.map((option, idx) => (
      <li key={idx}>
        <button className="w-full text-left" onClick={() => onSelect(option.value)}>{option.label}</button>
      </li>
    ))
  );

  const clickOutside = (e: Event) => {
    const target = e.target as Node;
    if (target && !multipleSelectorRef.current?.contains(target)) {
      setShow(false);
    }
  }

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', clickOutside);
    } else {
      document.removeEventListener('mousedown', clickOutside);
    }
  }, [show])

  return (
    <>
      <div className="multiple-selector" ref={multipleSelectorRef}>
        <label className="multiple-selector__label">SELECT CUSTOMERS</label>
        <div className="multiple-selector__input">
          <div className="multiple-selector__tags">
            {selected.map(({ name }, idx) => (
              <div className="multiple-tag" key={idx}>
                <span key={idx}>
                  {name}
                </span>
                <button className="w-4 h-4" onClick={() => onRemove(idx)}>
                  <img className="w-full h-full" src="/icons/times-icon.svg" alt="remover icono" />
                </button>
              </div>
            ))}
          </div>
          <input ref={multipleSelectorInputRef} onFocus={() => handleShow(true)} onInput={onSearch} className={classNames('multiple-input', {
            'multiple-input__active': selected.length > 0
          })} placeholder="Search by email" />
        </div>
        <div className="relative">
          {show && <ul className="multiple-selector__options">
            {
              results.length > 0
                ? renderOptions()
                : <p className="options__not-found">No results found</p>
            }
          </ul>}
        </div>

      </div>
    </>
  )
}