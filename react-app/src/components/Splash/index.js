import React from 'react';
import splash1 from '../images/Splash.png'
import splash2 from '../images/splash2.webp'
import splash5 from '../images/splash5.webp'
import splash6 from '../images/splash6.webp'
import './Splash.css'
import { NavLink } from 'react-router-dom';



const Splash = () => {
  return (
    <div className='splash-centering'>
      <div className="splash-container">
        <div className='splash-row'>
          <img src={splash1} alt="" height="636px" width="645px"></img>
          <div className='column'>
            <h3 className='splashtext1'>The future of money is here</h3>
            <h5 className='splashtext2'>Over 98 million people and businesses trust us to buy, sell, and manage crypto.</h5>
            <NavLink to='/signup' exact={true} className="button splash-button3">
              Get Started!
            </NavLink>
            <div className='splashtext3'>Sign up and get crypto*</div>
          </div>
        </div>


        <div className='splash-row-blue row splash-row'></div>
        <div className='row splash-row splash-row-top'>
          <div className='column white'>
            <h4>Sign up for a chance to win $1M in fake Bitcoin</h4>
            <div className='splashtext3'>Sign up for a Coinbase account by July 6, 2023 and you’ll be entered.</div>
            <div className='small-text'>*No purchase necessary. View sweepstakes rules</div>
          </div>
          <img src={splash2} alt="" height="400px" width="700px" className='cover top-margin'></img>
        </div>
        <div className='splash-row-blue-spacer'></div>

        {/* <div className='splash-row'>
          <img src={splash1} alt="" height="636px" width="645px" className='cover'></img>
          <div className='column'></div>
        </div> */}


        <div className='splash-row'>
          <div className='column pad-right'>
            <h4>The freedom of crypto for everyone, everywhere</h4>
            <div className='small-text'>We’re committed to creating more economic freedom through accessible, safe, and secure financial tools for everyone.</div>
          </div>
          <img src={splash5} alt="" height="590px" width="590px" className='cover'></img>
        </div>


        <div className='splash-row'>
          <img src={splash6} alt="" height="478px" width="433px" className='cover'></img>
          <div className='column margin-left'>
            <h5>Take control of your money</h5>
            <h3 className='splashtext1 top-margin'>Start your portfolio today and get crypto</h3>
            <NavLink to='/signup' exact={true} className="button top-margin splash-button3">
              Get Started!
            </NavLink>
          </div>
        </div>


        <div className='splash-row muted1'>
          <div>* No terms actually apply. Once you sign up, you'll have access to all the fake money you want so you can start pretend investing.
          Just navigate to the trade page and deposit funds into your account from the Bank of Satoshi, our completely made up bank with endless money supply. <br /><br />

          For real crypto, please use  <span> </span>
          <a className='link' href="https://strike.me/" target="_blank" rel="noopener noreferrer">Strike</a> for instant money transfers, buying bitcoin, or getting paid in bitcoin, all with no transaction fees,<span> </span>
          <a className='link' href="https://www.abra.com/" target="_blank" rel="noopener noreferrer">Abra</a> for trading crypto and for earning up to 10% APY on your holdings,<span> </span>
          and <a className='link' href="https://www.coinbase.com/" target="_blank" rel="noopener noreferrer">Coinbase</a> for beginner-friendly UI, easy onboard and limit orders on PRO. Coinbase is also the inspiration for this app. <br /><br />
          Referral codes:<span>  </span>
          <a className='link' href="https://invite.strike.me/QNJOES" target="_blank" rel="noopener noreferrer">Strike</a><span>  </span>
          <a className='link' href="https://www.abra.com/ref?r=CELEST11" target="_blank" rel="noopener noreferrer">Abra</a><span>  </span>
          <a className='link' href="https://coinbase.com/join/winter_0wo?src=ios-link" target="_blank" rel="noopener noreferrer">Coinbase</a>
          </div>
        </div>
        <div className='horizontal-line'></div>
        <div className='splash-row'>
          <div className='row'>
            <div className='column'>
              <NavLink to='/' exact={true}>
                <h2 className='primary coinblock'>coinblock</h2>
              </NavLink>
            </div>
            <div className='column footer-list'>
              <div className='mini-header'>Contact</div>
              <a className="muted1" href="https://www.linkedin.com/in/celestewinterton/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="muted1" href="https://github.com/celestewinterton" target="_blank" rel="noopener noreferrer">Github</a>
              <a className="muted1" href="https://angel.co/u/celeste-winterton" target="_blank" rel="noopener noreferrer">AngelList</a>
              <a className="muted1" href="mailto:celestewinterton@gmail.com" target="_blank" rel="noopener noreferrer">Gmail</a>
            </div>
            <div className='column footer-list'>
              <div className='mini-header'>Technologies</div>
              <div className='muted1'>Javascript</div>
              <div className='muted1'>React</div>
              <div className='muted1'>Redux</div>
              <div className='muted1'>Docker</div>
              <div className='muted1'>Python</div>
              <div className='muted1'>Flask</div>
              <div className='muted1'>SQL Alchemy</div>
              <div className='muted1'>PostgreSQL</div>
            </div>
            <div className='column footer-list'>
              <div className='mini-header'>Other Resources</div>
              <div className='muted1'>CoinGecko</div>
              <div className='muted1'>CyptoCompare</div>
              <div className='muted1'>Recharts</div>
              <div className='muted1'>Date-fns</div>
            </div>
          </div>
        </div>
        <div className='splash-row muted1'>Copyright © 2022 Coinblock by Celeste Winterton</div>
      </div>
    </div>
  );
}

export default Splash;
