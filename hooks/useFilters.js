import {useState} from 'react';
import {useDebounce} from 'use-debounce';

function useFilters() {
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterMessage, setFilterMessage] = useState(null);
  const [filterMessageDebounced] = useDebounce(filterMessage, 300);
  const [open, setOpen] = useState(false);

  const showFilterModal = () => {
    setOpen(true);
  };

  const closeFilterModal = options => {
    setFilterOptions(options);
    setOpen(false);
  };

  //we have to add the debound
  const handlerFilterText = text => {
    setFilterMessage(text);
  };

  return {filterOptions, filterMessageDebounced, open,handlerFilterText,closeFilterModal,showFilterModal};
}

export default useFilters;
