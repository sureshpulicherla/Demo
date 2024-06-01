import React,{useState} from "react";
import axios from 'axios';
import './App.css';

function App() {
  // State variables to store form data, ticket details, and email
  const [purchaseData, setPurchaseData] = useState({
    from: '',
    to: '',
    firstName: '',
    lastName: '',
    email: '',
    section: ''
  });

  const [ticket, setTicket] = useState(null);
  const [email, setEmail] = useState('');
  const [ticketDetails, setTicketDetails] = useState(null);

  // Function to update form data when inputs change
  const handleChange = (e) => {
    setPurchaseData({
      ...purchaseData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle purchasing a ticket
  const handlePurchase = () => {
    axios.post('http://localhost:8080/api/purchase', purchaseData)
      .then(response => {
        setTicket(response.data);
      })
      .catch(error => {
        console.error('There was an error purchasing the ticket!', error);
      });
  };

  // Function to handle getting ticket details
  const handleGetTicketDetails = () => {
    axios.get(`http://localhost:8080/api/ticket?email=${email}`)
      .then(response => {
        setTicketDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the ticket details!', error);
      });
  };

  return (
    <div className="App">
      <h1>Train Ticket Booking</h1>
      {/* Form to purchase a ticket */}
      <div>
        <h2>Purchase Ticket</h2>
        <input type="text" name="from" placeholder="From" onChange={handleChange} />
        <input type="text" name="to" placeholder="To" onChange={handleChange} />
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="text" name="section" placeholder="Section" onChange={handleChange} />
        <button onClick={handlePurchase}>Purchase</button>
        {ticket && <div>Ticket purchased: {JSON.stringify(ticket)}</div>}
      </div>
      {/* Form to get ticket details */}
      <div>
        <h2>Get Ticket Details</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={handleGetTicketDetails}>Get Details</button>
        {ticketDetails && <div>Ticket details: {JSON.stringify(ticketDetails)}</div>}
  
      </div>
    </div>
  );
}

export default App;
