import {
  Box,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  outlinedInputClasses,
  Select,
  SelectChangeEvent,
  Stack,
  TextareaAutosize,
  TextField,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Styles from "./TaskCard.module.css";
import { iTask } from "../../../type/task";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotFoundIcon from "../../../assests/NotFoundTask.svg";
import CloseModalIcon from "../../../assests/Group 48095853.svg";
import useUserStore from "../../../store/taskStore";
import TaskDetail from "../TaskDetailModal/TaskDetail";

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#0354d5",
            fontSize: "12px",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
            fontSize: "14px",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&::before, &::after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
              fontSize: "14px",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
              fontSize: "14px",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });
const fieldCss = {
  style: {
    fontSize: "14px",
    color: "rgba(128, 128, 128, 0.744)",
    fontFamily: `"Outfit",sans-serif`,
  },
};
const fieldInputCss = {
  style: {
    fontSize: "14px",
    color: "#080F1A",
    fontFamily: `"Outfit",sans-serif`,
  },
};

interface TasksListProps {
  tasks: iTask[];
}
const TaskCard: React.FC<TasksListProps> = ({ tasks = [] }) => {
  const outerTheme = useTheme();
  const { setTask, task: taskList } = useUserStore();
  const [detailsModal, setDetailsModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentTask, setCurrentTask] = useState<iTask | null>(null);
  const [selectedTask, setSelectedTask] = useState<iTask | null>(null);

  const formatDate = (date: any) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleString(undefined, options);
  };
  const onEditHandle = (task: iTask) => {
    setCurrentTask(task);
    setEditModal(true);
  };
  const handleCardClick = (task: iTask) => {
    setSelectedTask(task);
    setDetailsModal(true);
  };
  const handleEditSubmit = () => {
    if (!currentTask) return;
    const updatedTasks = taskList.map((task) =>
      task._id === currentTask._id ? currentTask : task
    );
    setTask(updatedTasks);
    setEditModal(false);
  };
  const handleUpdateTask = (updatedTask: iTask) => {
    const updatedTasks = taskList.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );
    setTask(updatedTasks);
    setSelectedTask(updatedTask); // Update the selected task for the modal
  };
  const deleteTask = (id: number | null) => {
    if (id === null) return;
    const updatedTasks = taskList.filter((task) => task._id !== id);
    setTask(updatedTasks);
  };

  return (
    <>
      {tasks.length > 0 ? (
        <Box className={Styles.card_layout}>
          {tasks.map((task) => (
            <Stack
              key={task._id}
              className={Styles.card_struct}
              onClick={() => handleCardClick(task)}
            >
              <Stack className={Styles.card_tops}>
                <Stack
                  className={
                    task.category == "Give"
                      ? Styles.card_category
                      : task.category == "Take"
                      ? Styles.card_category_office
                      : Styles.card_category_meeting
                  }
                >
                  {task.category ? task.category : "Not Mentioned"}
                </Stack>
                <Stack className={Styles.card_tops_btn}>
                  {" "}
                  <Stack>
                    <EditIcon
                      sx={{ color: "#133B5C" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditHandle(task);
                      }}
                    />
                  </Stack>
                  <Stack>
                    <DeleteIcon
                      sx={{ color: "#133B5C" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteModal(true);
                        setDeleteId(task._id);
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack className={Styles.card_botm_content}>
                <Stack className={Styles.card_title}>
                  <h3>{task.title}</h3>
                </Stack>
                <Stack
                  className={
                    task.result ? Styles.card_completed : Styles.card_Incomplete
                  }
                >
                  {" "}
                  {task.money} /-
                </Stack>
              </Stack>
              <Stack className={Styles.card_content}>
                {" "}
                <p>{task.description}</p>
              </Stack>

              <Stack className={Styles.date_content}>
                {" "}
                <p>{formatDate(task?.creation_date)}</p>
              </Stack>
            </Stack>
          ))}
        </Box>
      ) : (
        <Box className={Styles.deafult_screen}>
          <Stack className={Styles.deafult_screen_img}>
            <img src={NotFoundIcon} />
          </Stack>
          <Stack className={Styles.deafult_screen_text}>
            No Task Available
          </Stack>
        </Box>
      )}

      {/* MODAL for Delete the Tasks */}
      <Modal
        open={deleteModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={Styles.delete_modal}>
          <Stack
            className={Styles.delete_title}
            direction="row"
            spacing={1}
            display="flex"
            alignItems="center"
          >
            <Stack>Delete Note</Stack>
            <Stack
              className={Styles.delete_modal_close}
              onClick={() => setDeleteModal(false)}
            >
              <img src={CloseModalIcon} alt="" />
            </Stack>
          </Stack>
          <Box className={Styles.delete_Note_Text}>
            Are you sure want to delete this permanently, this action is
            irreversible.
          </Box>
          <Box className={Styles.delete_btn}>
            <Box
              className={Styles.delete_Cancel}
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Box>
            <Box
              className={Styles.delete_button}
              onClick={() => {
                deleteTask(deleteId);
                setDeleteModal(false);
              }}
            >
              Delete
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* MODAL for edit the Tasks */}
      <Modal open={editModal} aria-labelledby="edit-modal-title">
        <Box className={Styles.add_modal}>
          <Stack className={Styles.add_modal_head} marginBottom={"16px"}>
            <Stack className={Styles.add_modal_head_title}>Edit Task</Stack>
            <Stack
              className={Styles.modal_close}
              onClick={() => setEditModal(false)}
            >
              <img src={CloseModalIcon} alt="Close" />
            </Stack>
          </Stack>
          <Box className={Styles.form_layout}>
            <ThemeProvider theme={customTheme(outerTheme)}>
              <TextField
                label="Title"
                fullWidth
                value={currentTask?.title || ""}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask!, title: e.target.value })
                }
                InputLabelProps={fieldCss}
                InputProps={fieldInputCss}
                FormHelperTextProps={{
                  style: { fontSize: "10px", color: "red" },
                }}
              />
            </ThemeProvider>
            <ThemeProvider theme={customTheme(outerTheme)}>
              <TextField
                label="Money"
                fullWidth
                value={currentTask?.money || ""}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask!, money: e.target.value })
                }
                InputLabelProps={fieldCss}
                InputProps={fieldInputCss}
                FormHelperTextProps={{
                  style: { fontSize: "10px", color: "red" },
                }}
              />
            </ThemeProvider>
            <FormControl fullWidth>
              <InputLabel
                id="category-label"
                sx={{
                  fontSize: "14px",
                  color: "rgba(128, 128, 128, 0.744)",
                  fontFamily: '"Outfit", sans-serif',
                }}
              >
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={currentTask?.category || ""}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask!, category: e.target.value })
                }
                label="Category"
                fullWidth
                sx={{
                  fontSize: "14px",
                  color: "#080F1A",
                  fontFamily: '"Outfit", sans-serif',
                }}
              >
                <MenuItem value="Give" sx={fieldCss}>
                  Give
                </MenuItem>
                <MenuItem value="Take" sx={fieldCss}>
                  Take
                </MenuItem>
                <MenuItem value="Spent" sx={fieldCss}>
                  Spent
                </MenuItem>
              </Select>
            </FormControl>

            <TextareaAutosize
              className={Styles.textarea_autosize}
              name="description"
              placeholder="Description"
              value={currentTask?.description || ""}
              onChange={(e) =>
                setCurrentTask({
                  ...currentTask!,
                  description: e.target.value,
                })
              }
              minRows={5}
              maxRows={5}
            />
            <Stack className={Styles.add_modal_btn} marginTop={"16px"}>
              <Box
                className={Styles.buttons_cancel}
                onClick={() => setEditModal(false)}
              >
                Cancel
              </Box>
              <button
                className={Styles.buttons_save}
                onClick={handleEditSubmit}
              >
                Save
              </button>
            </Stack>
          </Box>
        </Box>
      </Modal>
      {/* End */}

      {/* Details Modal */}
      <TaskDetail
        open={detailsModal}
        onClose={() => setDetailsModal(false)}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
      />
    </>
  );
};

export default TaskCard;
