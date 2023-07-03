import React from "react";
import { motion } from "framer-motion";

const PaginationButtons = ({ totalPages, currentPage, paginate }) => {
  const paginationVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="pagination"
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: totalPages }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => paginate(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {index + 1}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default PaginationButtons;
