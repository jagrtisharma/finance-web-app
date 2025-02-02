import React, { ChangeEvent, useState } from "react";
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
import Styles from "./NewTaskModal.module.css";
import CloseModalIcon from "../../../assests/Group 48095853.svg";
import useUserStore from "../../../store/taskStore";
import { iTask } from "../../../type/task";

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

const NewTaskModal = () => {
  const outerTheme = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    description: "",
    money: "",
  });

  const { task, setTask } = useUserStore();

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setTaskData((prev) => ({ ...prev, category: e.target.value as string }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: iTask = {
      _id: Date.now(),
      title: taskData.title,
      category: taskData.category,
      description: taskData.description,
      money: taskData.money,
      result: false,
      creation_date: new Date(),
    };
    setTask([...task, newTask]);
    setIsAddModalOpen(false);
    setTaskData({ title: "", category: "", description: "", money: "" });
  };
  return (
    <>
      <Stack
        sx={{ width: { xs: "80%", md: "25%" } }}
        className={Styles.head_btn}
        onClick={() => setIsAddModalOpen(true)}
      >
        + New Entry{" "}
      </Stack>

      <Modal open={isAddModalOpen} onClose={() => {}}>
        <Box className={Styles.add_modal}>
          <Stack className={Styles.add_modal_head} marginBottom={"16px"}>
            <Stack className={Styles.add_modal_head_title}>Add Task</Stack>
            <Stack className={Styles.modal_close} onClick={handleCloseAddModal}>
              <img src={CloseModalIcon} alt="Close" />
            </Stack>
          </Stack>
          <form onSubmit={handleSubmit} className={Styles.form_layout}>
            <ThemeProvider theme={customTheme(outerTheme)}>
              <TextField
                label="Reason"
                name="title"
                value={taskData.title}
                onChange={handleInputChange}
                fullWidth
                required
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
                name="money"
                value={taskData.money}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={fieldCss}
                InputProps={fieldInputCss}
                FormHelperTextProps={{
                  style: { fontSize: "10px", color: "red" },
                }}
              />
            </ThemeProvider>
            <FormControl fullWidth>
              <InputLabel
                id="Category"
                sx={{
                  fontSize: "14px",
                  color: "rgba(128, 128, 128, 0.744)",
                  fontFamily: '"Outfit", sans-serif',
                }}
              >
                Category
              </InputLabel>
              <Select
                labelId="Category"
                id="Category"
                value={taskData.category}
                name="category"
                onChange={handleSelectChange}
                label="Category"
                fullWidth
                sx={{
                  fontSize: "14px",
                  color: "#080F1A",
                  fontFamily: '"Outfit", sans-serif',
                }}
              >
                <MenuItem value="Take">Take</MenuItem>
                <MenuItem value="Give">Give</MenuItem>
                <MenuItem value="Spent">Spent</MenuItem>
              </Select>
            </FormControl>

            <ThemeProvider theme={customTheme(outerTheme)}>
              <TextareaAutosize
                className={Styles.textarea_autosize}
                name="description"
                placeholder="Description"
                value={taskData.description}
                onChange={handleInputChange}
                required
                minRows={5}
                maxRows={5}
              />
            </ThemeProvider>
            <Stack className={Styles.add_modal_btn} marginTop={"16px"}>
              <Box
                className={Styles.buttons_cancel}
                onClick={handleCloseAddModal}
              >
                Cancel
              </Box>
              <button className={Styles.buttons_save} type="submit">
                Save
              </button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default NewTaskModal;
