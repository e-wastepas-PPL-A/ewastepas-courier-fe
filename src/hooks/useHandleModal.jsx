import { useEffect, useState } from "react";
import { getAllPickup } from "../services";

const useHandleModal = () => {
  const [pickup, setPickup] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    const fetchPickup = async () => {
      try {
        const response = await getAllPickup();
        if (response.status !== 200) {
          setIsLoading(false);
          console.error(response.response.data.error);
          throw new Error(`${response.message}, see details in console`);
        }
        const data = response.data.data;
        setPickup(data);
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    fetchPickup();
  }, []);

  const handleAction = (id) => {
    setSelectedRowId(id);
    setIsModal(!isModal);
  };

  const handleOpen = (row) => {
    setSelectedRow(row);
    setIsDetailOpen(true);
  };

  const handleClose = () => {
    setIsDetailOpen(false);
    setSelectedRow(null);
    setIsModal(false);
  };

  return {
    isLoading,
    pickup,
    selectedRow,
    selectedRowId,
    isDetailOpen,
    isModal,
    error,
    setPickup,
    handleOpen,
    handleClose,
    handleAction,
  };
};

export default useHandleModal;
