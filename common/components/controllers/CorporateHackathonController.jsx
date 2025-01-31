// @flow

import React from 'react';
import Headers from "../common/Headers.jsx";
import ContactUsModal from "../forms/ContactUsModal.jsx";
import prerender from "../utils/prerender.js";
import url from "../utils/url.js";
import Button from "react-bootstrap/Button";
import Section from "../enums/Section";
import Ch1Icon from "../svg/corporatehackathon/one.svg";
import Ch2Icon from "../svg/corporatehackathon/two.svg";
import Ch3Icon from "../svg/corporatehackathon/three.svg";
import cdn from "../utils/cdn.js";

type State = {|
  showContactModal: boolean
|};

class CorporateHackathonController extends React.PureComponent<{||}, State> {
  constructor(props) {
    super(props);
    this.state = {
      showContactModal: false
    };
  }

  componentDidMount() {
    prerender.ready();
  }
//TODO: Get headers from the back end, see PR #446 for example of the change
  _renderHeader(): React$Node {
    const title: string = "DemocracyLab | Corporate Hackathons";
    const description: string = "Host a hackathon with DemocracyLab!"

    return (
      <Headers
        title={title}
        description={description}
      />
    );
  }

  onSubmit(): void {
    this.setState({showContactModal: false});
  }

   render(): $React$Node {
     return (
       <React.Fragment>
         <ContactUsModal showModal={this.state.showContactModal} onSubmit={this.onSubmit.bind(this)} />
         {this._renderHeader()}
        <div className="corporate-hackathon-root">
          {this._hostWithUs()}
          <div className="container">
            <div className="row">
              {this._howItWorks()}
              {this._whyEngage()}
              {this._strengthenTeam()}
              {this._hackathonSponsorships()}
            </div>
          </div>
        </div>
       </React.Fragment>
     )
   }

  _hostWithUs(): $React$Node {
    return (
      <div className="corporate-hackathon-hostwithus hero-wide ch-divider">
        <div className="hero-wide-content">
          <div className="hero-wide-flex-content">
            <div className="corporate-hackathon-hostwithus-left">
              <h1>Host a hackathon with us!</h1>
              <p className="corporate-hackathon-hostwithus-left-text">Create a unique employee engagement experience and deliver instant-impact tech projects.</p>
              <Button className="corporate-hackathon-hostwithus-left-button" variant="primary" onClick={() => this.setState({showContactModal: true})}>Get Started</Button>
              {this._publicHackathonResults("d-lg-none d-xl-block")}
            </div>
            <div className="corporate-hackathon-hostwithus-right">
              <div className="corporate-hackathon-hostwithus-header">
                <picture>
                  <source media="(max-width: 991px)" srcSet={cdn.image("mobile-header-withbg.png")} />
                  <source media="(min-width: 992px)" srcSet={cdn.image("header-withbg-img.png")} />
                  <img src={cdn.image("header-withbg-img.png")} alt="Header Image" />
                </picture>
              </div>
            </div>
          </div>
          {this._publicHackathonResults("d-none d-lg-block d-xl-none")}
        </div>
      </div>
    );
  }

  _publicHackathonResults(classes): $React$Node {
    return (
      <div className={classes}>
        <h2>Public Hackathon Results</h2>
        <div className="corporate-hackathon-hostwithus-results">
          <div className="corporate-hackathon-hostwithus-results-item">
            <h3>$1 <span className="text-nowrap">million +</span></h3>
            <p>Public Value Created</p>
          </div>
          <div className="corporate-hackathon-hostwithus-results-item">
            <h3>1200</h3>
            <p>Volunteers</p>
          </div>
          <div className="corporate-hackathon-hostwithus-results-item">
            <h3>100+</h3>
            <p>Projects</p>
          </div>
          <div className="corporate-hackathon-hostwithus-results-item">
            <h3>100</h3>
            <p>Average Attendees/Event</p>
          </div>
        </div>
      </div>
    )
  };

  _howItWorks(): $React$Node {
    return (
      <div className="corporate-hackathon-howitworks col-12 ch-divider">
        <h2>How It Works</h2>
        <p>As soon as you have signed up for a hackathon, the DemocracyLab team gets right to work on finding non-profits in need of tech volunteers. You can focus on team building; we’ll get everything set up with your specific goals in mind. There are just a few things we need from you!</p>
        <div className="corporate-hackathon-howitworks-container">
          <div className="corporate-hackathon-howitworks-item">
            <img src={cdn.image("recruit-icon.png")} alt="Recruit"/>
            <div><Ch1Icon /><h4>Recruit</h4></div>
            <p>Encourage your employees to sign up for the hackathon! We’ll find non-profits with needs that are a good fit for your team.</p>
          </div>
          <div className="corporate-hackathon-howitworks-item">
            <img src={cdn.image("define-icon.png")} alt="Define"/>
            <div><Ch2Icon /><h4>Define</h4></div>
            <p>We’ll work with the non-profits to identify achievable, instant-impact projects that are ready for your team, then connect you with the non-profit team to define the scope.</p>
          </div>
          <div className="corporate-hackathon-howitworks-item">
            <img src={cdn.image("hack-icon.png")} alt="Hack"/>
            <div><Ch3Icon /><h4>Hack!</h4></div>
            <p>On the day of the hackathon, your team of product, design, and development volunteers will collaborate and create civic tech! We’ll take care of everything else.</p>
          </div>
        </div>
        <p>Once the hackathon is finished, you’re all done! Your team can get back to work and enjoy renewed enthusiasm and deeper engagement. DemocracyLab will survey both volunteers and project owners to provide you a clear summary of the outcomes and impacts of the event.</p>
      </div>
    )
  }

  _whyEngage(): $React$Node {
    const whyStyle = {
      backgroundImage: 'url(' + cdn.image("checkmark-icon.png") + ')',
    }
    return (
      <div className="corporate-hackathon-whyengage col-12">
        <div className="corporate-hackathon-whyengage-container">
          <div className="corporate-hackathon-whyengage-left">
            <h2>Why Engage?</h2>
            <ul>
              <li style={whyStyle}>
                <h3>Build company culture</h3>
                <p>Hackathons cultivate an open, agile company culture centered on innovation, flexibility, and idea sharing, even between positions and unrelated departments.</p>
              </li>
              <li style={whyStyle}>
                <h3>Nurture innovation</h3>
                <p>Corporate hackathons allow employees the opportunity to take risks, try bold new strategies, and share their knowledge and experience with others in a low-pressure environment.</p>
              </li>
              <li style={whyStyle}>
                <h3>Create positive public relations</h3>
                <p>Companies that participate in hackathons show themselves to be drivers of change in their industry and community, to both their employees and the public.</p>
              </li>
            </ul>
            <div className="corporate-hackathon-whyengage-source">Source: “<a href="https://link.springer.com/chapter/10.1007/978-3-030-35333-9_27" target="_blank" rel="nofollow noopener">On the Benefits of Corporate Hackathons for Software Ecosystems - A Systemic Mapping Study</a>”</div>
          </div>
          <div className="corporate-hackathon-whyengage-right">
            <div className="corporate-hackathon-whyengage-image">
            <picture>
              <source media="(max-width: 991px)" srcSet={cdn.image("mobile-why-engage-withbg.png")} />
              <source media="(min-width: 992px)" srcSet={cdn.image("why-engage-withbg-img.png")} />
              <img src={cdn.image("why-engage-img.png")} alt="Header Image" />
            </picture>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _strengthenTeam(): $React$Node {
    return (
      <div className="corporate-hackathon-strengthen col-12">
      <h2>Strengthen your team while supporting the acceleration of social change.</h2>
      <Button variant="light" onClick={() => this.setState({showContactModal: true})}>Get Started</Button>
      </div>
    )
  }

  _hackathonSponsorships(): $React$Node {
    return (
      <div className="corporate-hackathon-sponsorships col-12">
        <h2>Public Hackathon Sponsorships: Another Way To Engage</h2>
        <div className="corporate-hackathon-sponsorships-container">
          <div className="corporate-hackathon-sponsorships-image">
            <img src={cdn.image("event-sponsorship-img.png")} alt="Event Sponsorships" />
          </div>
          <div className="corporate-hackathon-sponsorships-text">
            <h3>Event Sponsorship</h3>
            <h4>Starting at $500 per event</h4>
            <p>Not ready to host? Sponsor one of our public hackathons! Your sponsorship will help us drive innovation, support non-profits and civic tech organizations, and promote your brand before, during, and after the event!</p>
            <div className="corporate-hackathon-sponsorships-button">
              <Button variant="primary" href={url.section(Section.PartnerWithUs)}>Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    )

  }

}

export default CorporateHackathonController;
