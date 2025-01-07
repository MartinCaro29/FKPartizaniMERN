import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllContacts");
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching contacts");
        setLoading(false);
        console.log("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <div className="section-header" style={{marginTop:'25px'}}>Mesazhet</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Emri</th>
            <th>Email</th>
            <th>Mesazhi</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.comment}</td>
              <td>{contact.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllContacts;
