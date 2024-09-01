import React from 'react';
import { motion, useInView } from 'framer-motion';
import "./RightSideText.css";
import { Link } from 'react-router-dom';

const textVariants = {
  initial: {
    x: 500, 
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const childTextVariants = {
  initial: {
    x: 500, 
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const RightSideText = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: '0px 0px -50% 0px' });

  return (
    <div className='hero' id='splitExpense' >
      <div className="imageContainer">
        <img style={{ height: "100vh" }} src="/rpt2.png" alt="Hero" />
      </div>
      <div className="wrapper">
        <motion.div
          className="textContainer"
          ref={ref}
          variants={textVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <motion.h1 variants={childTextVariants} style={{ fontSize: "85px" }}>Split Expense on Vacation</motion.h1>
          {/* <motion.h1 variants={childTextVariants} style={{ marginTop: "-10px" }}>Use our Expense Tracker</motion.h1> */}
          <motion.div className="cardContainer" variants={childTextVariants}>
            <motion.div className="card">
              <Link to="/split-expense-full" className='q-split'>
                Expense Tracker
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RightSideText;
