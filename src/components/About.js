import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

//hook
function Count() {
	const [count, setCount] = useState(0);
	return (
		<div className="about-click-container">
			<p>You clicked <strong>{count}</strong> times</p>
			<button className="about-click-btn" onClick={() => setCount(count + 1)}>Increment</button>
			<button className="about-click-btn" onClick={() => setCount(count - 1)}>Decrement</button>
		</div>
	)
}

class About extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			err: false
		}
	}

	clickHandler = () => {
		this.setState({ err: true });
	}
	
	render () {
		if(this.state.err) {
			throw new Error('I was crashed');
		}

		return (
				<div className="primary-container">
					<h2>About Section</h2>
			
					<Count />
					<button className="get-throw-error" onClick={this.clickHandler}>Get Throw Error</button>
					<NavLink className="get-throw-error" to="/error/internal-server-error">Internal Server Error</NavLink>
					<p>Does that all sound complicated?

						It really isn’t.

						The main purpose of your About Us page is to give your visitors a glimpse into who you are as a person or a business (or sometimes both).

						As users discover your brand, they need to distinguish what sets you apart and makes you… you.

						This often requires finding the right balance between compelling content and a design carefully planned to look the part.

						Conveying your identity in a fun and approachable – but also reliable and informative – way is challenging.

						If you know who you are and your goal for your site, the About Us page should come naturally.

						However, if you’re looking for some inspiration, you can always check out the following 25 awesome examples of About Us pages.
					</p>
					<p>ToyFight is an award-winning creative design agency.

						You’ll find the About Page at the top of the menu under the Who section.

						This page has a unique feel, thanks to the deconstructed action figures representing the founders, Leigh Whipday and Jonny Lander.

						The great attention to detail and interactivity also reflect the company’s 16 years of experience.
					</p>

					<p>Why?

						Because as much as you love good design and inspiring illustrations, you also want to meet the people that curate all the content for you.

						Furthermore, it’s equally rewarding when you realize that they are just as eager to start a visual dialogue with you.

						Nathan Strandberg and Katie Kirk are doing what makes them happy, and this is obvious throughout their page.
					</p>
					<p>ToyFight is an award-winning creative design agency.

						You’ll find the About Page at the top of the menu under the Who section.

						This page has a unique feel, thanks to the deconstructed action figures representing the founders, Leigh Whipday and Jonny Lander.

						The great attention to detail and interactivity also reflect the company’s 16 years of experience.
					</p>

					<MDBAccordion initialActive='accordionCollapse1'>
						<MDBAccordionItem collapseId='accordionCollapse1' headerTitle='Example'>
							<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
							plugin adds the appropriate classes that we use to style each element. These classes control the overall
							appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
							custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
							within the .accordion-body, though the transition does limit overflow.
						</MDBAccordionItem>
						<MDBAccordionItem collapseId='accordionCollapse2' headerTitle='Project'>
							<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse
							plugin adds the appropriate classes that we use to style each element. These classes control the overall
							appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
							custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
							within the .accordion-body, though the transition does limit overflow.
						</MDBAccordionItem>
						<MDBAccordionItem collapseId='accordionCollapse3' headerTitle='Testing'>
							<strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse
							plugin adds the appropriate classes that we use to style each element. These classes control the overall
							appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
							custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
							within the .accordion-body, though the transition does limit overflow.
						</MDBAccordionItem>
					</MDBAccordion>
				</div>
		)
	}
}

export default About;