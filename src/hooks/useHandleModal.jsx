import { useEffect, useState } from "react";
import { getAllPickup } from "../services";

const useHandleModal = () => {
  const [pickup, setPickup] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    const fetchPickup = async () => {
      try {
        const response = await getAllPickup();
        const data = response.data.data;
        setPickup(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
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
    setPickup,
    handleOpen,
    handleClose,
    handleAction,
  };
};

export default useHandleModal;
