import React from "react";
import styled from "styled-components";

import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const CollapseMenu = props => {
	const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

	if (props.navbarState === true) {
		return (
			<CollapseWrapper
				style={{
					transform: open
						.interpolate({
							range: [0, 0.2, 0.3, 1],
							output: [0, -20, 0, -200]
						})
						.interpolate(openValue => `translate3d(0, ${openValue}px, 0`)
				}}
			>
				<NavLinks>
					<li>
						<Link to="/" onClick={props.handleNavbar}>
							Home
						</Link>
					</li>
					<li>
						<Link to="/about" onClick={props.handleNavbar}>
							About Us
						</Link>
					</li>
					<li>
						<Link to="/programs" onClick={props.handleNavbar}>
							Programs
						</Link>
					</li>
					<li>
						<Link to="/projects" onClick={props.handleNavbar}>
							Projects
						</Link>
					</li>
					<li>
						<Link to="/contact" onClick={props.handleNavbar}>
							Contact Us
						</Link>
					</li>
					<li>
						<Link
							className="btn"
							to="/projects/project.four/"
							onClick={props.handleNavbar}
						>
							Apply Now
						</Link>
					</li>
				</NavLinks>
			</CollapseWrapper>
		);
	}
	return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
	background: #ece913;
	position: fixed;
	top: 4.5rem;
	left: 0;
	right: 0;
	z-index: 1;
`;

const NavLinks = styled.ul`
	list-style-type: none;
	padding: 2rem 1rem 2rem 2rem;

	& li {
		transition: all 300ms linear 0s;
	}

	& a {
		font-size: 0.9rem;
		line-height: 2;
		color: #000;
		text-transform: uppercase;
		text-decoration: none;
		cursor: pointer;
		-webkit-box-shadow: none;

		&:hover {
			color: #ff0000;
			border-bottom: 1px solid #fdcb6e;
		}
	}
`;
