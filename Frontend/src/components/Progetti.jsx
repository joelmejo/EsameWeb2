import React, { useEffect, useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { fetchProgetti } from '../api';

const Progetti = () => {
  const [progetti, setProgetti] = useState([]);
  const [filteredProgetti, setFilteredProgetti] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProgetti = async () => {
      const data = await fetchProgetti();
      setProgetti(data);
      setFilteredProgetti(data);
    };
    getProgetti();
  }, []);

  useEffect(() => {
    let sortedProgetti = Array.isArray(progetti) ? [...progetti] : [];
    if (sortConfig.key) {
      sortedProgetti.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setFilteredProgetti(sortedProgetti.filter(progetto =>
      progetto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [progetti, sortConfig, searchTerm]);

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = key => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return null;
  };

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Container className="mt-4">
      <h1>Progetti</h1>
      <Form.Control
        type="text"
        placeholder="Cerca per nome"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>ID {getSortIndicator('id')}</th>
            <th onClick={() => requestSort('nome')}>Nome {getSortIndicator('nome')}</th>
            <th onClick={() => requestSort('inizio')}>Inizio {getSortIndicator('inizio')}</th>
            <th onClick={() => requestSort('fine')}>Fine {getSortIndicator('fine')}</th>
            <th onClick={() => requestSort('budget')} className="text-end">Budget {getSortIndicator('budget')}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredProgetti) && filteredProgetti.map(progetto => (
            <tr key={progetto.id}>
              <td>{progetto.id}</td>
              <td>{progetto.nome}</td>
              <td>{formatDate(progetto.inizio)}</td>
              <td>{formatDate(progetto.fine)}</td>
              <td className="text-end">{progetto.budget}€</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Progetti;