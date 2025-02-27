import React, { useEffect, useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { fetchPersone } from '../api';

const Persone = () => {
  const [users, setPersone] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const getPersone = async () => {
      const data = await fetchPersone();
      setPersone(data);
    };
    getPersone();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.posizione.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '';
  };

  return (
    <Container className="mt-4">
      <h1>Persone</h1>
      <Form.Control
        type="text"
        placeholder="Cerca..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('nome')}>Nome {getSortIndicator('nome')}</th>
            <th onClick={() => handleSort('cognome')}>Cognome {getSortIndicator('cognome')}</th>
            <th onClick={() => handleSort('posizione')}>Posizione {getSortIndicator('posizione')}</th>
            <th onClick={() => handleSort('stipendio')}>Stipendio {getSortIndicator('stipendio')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr>
              <td>{user.nome}</td>
              <td>{user.cognome}</td>
              <td>{user.posizione}</td>
              <td className="text-end">{user.stipendio}€</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Persone;