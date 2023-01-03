import {useState} from 'react';

function useDashboard() {
  const [tasks, setTasks] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [open, setOpen] = useState({open: false, update: false, task_id: null});
  const [refresh, setRefresh] = useState(false);
  const [modalGuest, setModalGuest] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);
  const [openReminderModal, setOpenReminderModal] = useState({open:false,fields: null});

  const openModalGuest = () => {
    setModalGuest(true);
  };

  const handlerOpenReminderModal = fields => {
    setOpenReminderModal({open: true, fields: fields});
  };

  const closeReminderModal = () => {
    setOpenReminderModal({open:false,fields: null});
  };

  const closeModalGuest = () => {
    setModalGuest(false);
  };

  const handlerFilters = value => {
    setFilterOptions(value);
  };

  const handlerProfilePhoto = uri => {
    setProfilePhoto(uri);
  };

  const saveTasks = data => {
    setTasks(data);
  };

  const refreshScreen = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 250);
  };

  const openCreateOrUpdateTask = (update = false, task_id) => {
    setOpen({open: true, update: update, task_id: task_id});
  };

  const closeModal = () => {
    setOpen({open: false, update: false, task_id: null});
  };

  return {
    filterOptions,
    refresh,
    profilePhoto,
    open,
    tasks,
    modalGuest,
    openReminderModal,
    refreshScreen,
    handlerFilters,
    handlerProfilePhoto,
    saveTasks,
    openCreateOrUpdateTask,
    closeModal,
    openModalGuest,
    closeModalGuest,
    handlerOpenReminderModal,
    closeReminderModal,
  };
}

export default useDashboard;
