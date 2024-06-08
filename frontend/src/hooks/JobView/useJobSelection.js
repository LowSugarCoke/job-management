import { useState } from 'react';

export const useJobSelection = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);

  const handleSelectJob = (id) => {
    setSelectedJobs((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((j) => j !== id) : [...prevSelected, id]
    );
  };

  return { selectedJobs, handleSelectJob };
};
