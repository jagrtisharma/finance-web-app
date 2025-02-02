import { Box, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import Styles from "./TaskScreen.module.css";
import NewTaskModal from "./NewTaskModal/NewTaskModal";
import TaskCard from "./TaskCard/TaskCard";
import useUserStore from "../../store/taskStore";
import NotFoundIcon from "../../assests/NotFoundTask.svg";
const TaskScreen = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const { task: tasks, setTask } = useUserStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [takeMoney, setTakeMoney] = useState(0);
  const [giveMoney, setGiveMoney] = useState(0);
  const [spentMoney, setSpentMoney] = useState(0);

  const filteredTasks = tasks.filter((task) => {
    // Filter by category based on selectedOption
    const categoryMap: { [key: number]: string } = {
      1: "Give",
      2: "Take",
      3: "Spent",
    };

    const selectedCategory = categoryMap[selectedOption];

    // If the selectedOption is 0 (All), show all tasks; otherwise, filter by category
    if (selectedOption !== 0 && task.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    const totalGive = tasks
      .filter((task) => task.category === "Give")
      .reduce((sum, task) => sum + Number(task.money), 0);
    const totalTake = tasks
      .filter((task) => task.category === "Take")
      .reduce((sum, task) => sum + Number(task.money), 0);
    const totalSpent = tasks
      .filter((task) => task.category === "Spent")
      .reduce((sum, task) => sum + Number(task.money), 0);

    setGiveMoney(totalGive);
    setTakeMoney(totalTake);
    setSpentMoney(totalSpent);
  }, [tasks]);

  // Apply search query filtering
  const displayedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const cardsData = [
    {
      id: 1,
      title: "All",
      content: takeMoney + giveMoney + spentMoney,
      color: "#cddefe",
    },
    {
      id: 2,
      title: "Take",
      content: takeMoney,
      color: "#cddefe",
    },
    {
      id: 3,
      title: "Give",
      content: giveMoney,
      color: "#fff1cc",
    },
    {
      id: 4,
      title: "Spent",
      content: spentMoney,
      color: "#dbf0e7",
    },
  ];
  return (
    <>
      <Box height={"90%"}>
        <Stack className={Styles.dashboard_section_head}>
          <Stack className={Styles.head_title}>CashBook</Stack>
          <Stack
            className={Styles.task_perform}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column-reverse !important",
                md: "row !important",
              },
            }}
          >
            <Stack
              width={"70%"}
              position={"relative"}
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <span className={Styles.search_icon}>
                {" "}
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={Styles.search_input}
                placeholder="Search note by title..."
              />
            </Stack>
            <NewTaskModal />
          </Stack>
        </Stack>
        <Stack className={Styles.search_layout_mobile}>
          <Stack
            width={"90%"}
            position={"relative"}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <span className={Styles.search_icon}>
              {" "}
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={Styles.search_input}
              placeholder="Search note by title..."
            />
          </Stack>
        </Stack>

        <Box className={Styles.OrderType_container}>
          {cardsData.map((card) => (
            <>
              <Stack
                className={Styles.OrderType_card}
                sx={{
                  borderLeft:
                    card.id !== 1
                      ? "1px solid var(--Borders-Light-Grey, #D4DBE5)"
                      : "none",
                }}
              >
                <Stack className={Styles.OrderType_card_title}>
                  {card.title}
                </Stack>
                <Stack className={Styles.OrderType_card_value}>
                  {card.content ? card.content : 0}/-
                </Stack>
              </Stack>
            </>
          ))}
        </Box>

        <Stack className={Styles.active_user_layout}>
          <Stack
            className={Styles.active_user_btn}
            onClick={() => {
              setSelectedOption(0);
            }}
            sx={{
              background: selectedOption !== 0 ? "#f4878790" : "#f48787",
            }}
          >
            All ( {tasks.length} )
          </Stack>

          <Stack
            className={Styles.active_user_btn}
            onClick={() => {
              setSelectedOption(1);
            }}
            sx={{
              background:
                selectedOption !== 1
                  ? "rgba(125, 14, 229, 0.248)"
                  : "rgba(125, 14, 229, 0.76)",
            }}
          >
            Give ( {tasks.filter((task) => task.category == "Give").length} )
          </Stack>

          <Stack
            className={Styles.active_user_btn}
            onClick={() => {
              setSelectedOption(2);
            }}
            sx={{
              background:
                selectedOption !== 2
                  ? "rgba(10, 102, 230, 0.349)"
                  : "rgba(10, 102, 230, 0.87)",
            }}
          >
            Take ( {tasks.filter((task) => task.category == "Take").length} )
          </Stack>
          <Stack
            className={Styles.active_user_btn}
            onClick={() => {
              setSelectedOption(3);
            }}
            sx={{
              background:
                selectedOption !== 3
                  ? "rgba(223, 34, 100, 0.349)"
                  : "rgba(223, 34, 100, 0.81)",
            }}
          >
            Spent ( {tasks.filter((task) => task.category == "Spent").length} )
          </Stack>
        </Stack>

        {/* Section Cards Layouts */}
        <Box className={Styles.tasks_layout}>
          {displayedTasks.length > 0 ? (
            <>
              <Stack className={Styles.title_card}>
                {selectedOption == 0
                  ? "All Spend"
                  : selectedOption == 1
                  ? "Give"
                  : selectedOption == 2
                  ? "Take"
                  : "Spent"}
              </Stack>
              <TaskCard tasks={displayedTasks} />
            </>
          ) : (
            <Box className={Styles.deafult_screen}>
              <Stack className={Styles.deafult_screen_img}>
                <img src={NotFoundIcon} />
              </Stack>
              <Stack
                className={Styles.deafult_screen_text}
                alignItems={"center"}
              >
                No Entry Available
              </Stack>
              <Stack
                width={"30%"}
                alignItems={"center"}
                marginTop={"10px"}
                paddingLeft={"2%"}
              >
                <NewTaskModal />
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TaskScreen;
