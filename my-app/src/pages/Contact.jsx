import React from 'react';
import { motion } from 'framer-motion';
import './contact.css';

const Footer = () => {
  const variants = {
    initial: {
      y: 500,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div className='contact' initial="initial" animate="animate" variants={variants}>
      <motion.div className="textContainer" variants={variants}>
        <motion.div className='item'>
        <motion.h1 variants={variants} >Reach Us</motion.h1>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Mail</h2>
          <span>SplitIt@email.com</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>WhatsApp</h2>
          <span>+1 234 5678</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Linkdin</h2>
          <span>+1 234 5678</span>
        </motion.div>
      </motion.div>
      <div className="formContainer">
        <motion.div className='phoneSvg' initial={{ opacity: 1 }} whileInView={{ opacity: 0 }} transition={{ duration: 3 }}>
       
        </motion.div>
        <form>
          <input type="text" required placeholder='Name' />
          <input type="email" required placeholder='Email' />
          <textarea rows={8} required placeholder='Message'></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </motion.div>
  );
};

export default Footer;