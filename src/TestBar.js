import React from "react";
import { motion } from "framer-motion";
import RandomCreate from "./RondomCreate";
const TestBar = ({
  handleShuffle,
  handleSortByAuthor,
  handleClickCreate,
  handleClickDelete,
  sortedByAuthor,
}) => {
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <div className="test-bar">
      <motion.button
        onClick={handleShuffle}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Shuffle
      </motion.button>
      <motion.button
        onClick={handleSortByAuthor}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        disabled={sortedByAuthor}
      >
        Sort by Author
      </motion.button>
        <RandomCreate />
    </div>
  );
};

export default TestBar;
