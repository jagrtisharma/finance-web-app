import React from "react";
import { Box, Modal, Stack, Typography, Button } from "@mui/material";
import Styles from "./TaskDetailModal.module.css";
import { iTask } from "../../../type/task";
import CloseModalIcon from "../../../assests/Group 48095853.svg";

interface TaskDetailsModalProps {
  open: boolean;
  onClose: () => void;
  task: iTask | null;
  onUpdateTask: (updatedTask: iTask) => void;
}

const TaskDetail: React.FC<TaskDetailsModalProps> = ({
  open,
  onClose,
  task,
  onUpdateTask,
}) => {
  const formatDate = (date: any) => {
    if (!date) return "N/A";
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

  const handleToggleCompletion = () => {
    if (task) {
      onUpdateTask({ ...task, result: !task.result });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={Styles.add_modal}>
        {task && (
          <>
            <Stack className={Styles.add_modal_head}>
              <Stack className={Styles.add_modal_head_title}>
                {task.title}
              </Stack>
              <Stack className={Styles.modal_close} onClick={onClose}>
                <img src={CloseModalIcon} alt="Close" />
              </Stack>
            </Stack>
            <Stack className={Styles.form_layout}>
              <Stack className={Styles.content_layout}>
                <Stack className={Styles.content_layout_head}>Category:</Stack>
                <Stack
                  className={
                    task.category == "Personal"
                      ? Styles.card_category
                      : task.category == "Office"
                      ? Styles.card_category_office
                      : Styles.card_category_meeting
                  }
                >
                  {task.category || "N/A"}
                </Stack>
              </Stack>
              <Stack className={Styles.content_layout}>
                <Stack className={Styles.content_layout_head}>
                  Description:
                </Stack>
                <Stack className={Styles.description}>
                  {task.description || " "}
                </Stack>
              </Stack>
              <Stack className={Styles.content_layout}>
                <Stack className={Styles.content_layout_head}>Money:</Stack>
                <Stack
                  className={
                    task.result ? Styles.card_completed : Styles.card_Incomplete
                  }
                >
                  {task.money} /-
                </Stack>
              </Stack>
              <Stack className={Styles.content_layout}>
                <Stack className={Styles.content_layout_head}>
                  Created On:
                </Stack>
                <Stack className={Styles.description}>
                  {formatDate(task.creation_date)}
                </Stack>
              </Stack>
              <Stack className={Styles.add_modal_btn}>
                <button className={Styles.buttons_cancel} onClick={onClose}>
                  Close
                </button>
              </Stack>
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TaskDetail;
