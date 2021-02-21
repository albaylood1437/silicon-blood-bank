import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

import Brand from "./Brand";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";
import { Link } from "react-router-dom";


const Navbar = props => {
	
	const barAnimation = useSpring({
		from: { transform: "translate3d(0, -10rem, 0)" },
		transform: "translate3d(0, 0, 0)"
	});

	const linkAnimation = useSpring({
		from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
		to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
		delay: 800,
		config: config.wobbly
	});

	return (
		<>
			<NavBar style={barAnimation}>
				<FlexContainer>
				    <Brand />
					<NavLinks style={linkAnimation}>
						<Link to="/">Home</Link>
						<Link to="/about">About</Link>
						<Link to="/programs">Donors</Link>
						<Link to="/booking" className="btn btn-top">
							Booking
						</Link>
					</NavLinks>
					<BurgerWrapper>
						<BurgerMenu
							navbarState={props.navbarState}
							handleNavbar={props.handleNavbar}
						/>
					</BurgerWrapper>
				</FlexContainer>
			</NavBar>
			<CollapseMenu
				navbarState={props.navbarState}
				handleNavbar={props.handleNavbar}
			/>
		</>
	);
};

export default Navbar;

const NavBar = styled(animated.nav)`
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	background: #fff;
	z-index: 1;
	font-size: 0.999rem;
	z-index: 2;
	box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
`;

const FlexContainer = styled.div`
	max-width: 120rem;
	display: flex;
	margin: auto;
	padding: 0 2rem;
	justify-content: space-between;
	height: 5rem;
`;

const NavLinks = styled(animated.ul)`
	justify-self: end;
	list-style-type: none;
	margin: auto 0;

	& a {
		color: #000;
		// text-transform: uppercase;
		font-weight: 600;
		// border-bottom: 1px solid transparent;
		margin: 0 1.5rem;
		transition: all 300ms linear 0s;
		text-decoration: none;
		-webkit-box-shadow: none;

		cursor: pointer;

		&:hover {
			color: #777;
			border-bottom: 1px solid #fff;
		}

		@media (max-width: 768px) {
			display: none;
		}
	}
`;

const BurgerWrapper = styled.div`
	margin: auto 0;

	@media (min-width: 769px) {
		display: none;
	}
`;
