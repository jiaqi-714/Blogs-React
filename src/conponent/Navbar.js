import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const svgVariants = {
	initial: {
		opacity: 0
	},
	animate: {
		opacity: 1,
		transition: { duration: 1 }
	}
}

const Navbar = ({ isActive, setActiveIndex }) => {
	return (
		<motion.nav className="navbar"
			variants={svgVariants}
			initial='initial'
			animate='animate'
		>
			<h1>The Dojo Blog</h1>
			<div className="links">
				<Link to="/">Home</Link>
				<Link to="/create">New Blog</Link>
			</div>
		</motion.nav>

	);
}

export default Navbar;