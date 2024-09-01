import React, { useRef , useEffect , useState} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './parallyx.css';

function ParallyxHome() {
    const ref = useRef();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    return (
        <div ref={ref} className='parallax' style={{ background: "linear-gradient(180deg, #111132, #0c0c1d)", position: "relative" }}>
            <motion.h1  className={isScrolled ? 'scrolled' : ''} style={{ y: yText, position: "relative", left: "-33px" }}>
                SPLIT IT
                <br />
          
                {/* <span style={{fontSize:"80px"}}>This is your One stop solution</span> */}
            </motion.h1>
          
            <motion.div style={{ y: yBg }} className="buildings"></motion.div>
            <motion.div className="stars"></motion.div>
        </div>
    );
}

export default ParallyxHome;