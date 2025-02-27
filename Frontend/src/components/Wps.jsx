import React, { useEffect, useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { fetchWps } from '../api';

const Wps = () => {
  const [wps, setWps] = useState([]);
  const [filteredWps, setFilteredWps] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getWps = async () => {
      const data = await fetchWps();
      setWps(data);
      setFilteredWps(data);
    };
    getWps();
  }, []);

  useEffect(() => {
    let sortedWps = [...wps];
    if (sortConfig.key) {
      sortedWps.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setFilteredWps(sortedWps.filter(wp =>
      wp.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [wps, sortConfig, searchTerm]);

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
      <h1>Wps</h1>
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
            <th onClick={() => requestSort('progetto')}>Progetto {getSortIndicator('progetto')}</th>
            <th onClick={() => requestSort('nome')}>Nome {getSortIndicator('nome')}</th>
            <th onClick={() => requestSort('inizio')}>Inizio {getSortIndicator('inizio')}</th>
            <th onClick={() => requestSort('fine')}>Fine {getSortIndicator('fine')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredWps.map(wp => (
            <tr key={wp.id}>
              <td>{wp.progetto}</td>
              <td>{wp.nome}</td>
              <td>{formatDate(wp.inizio)}</td>
              <td>{formatDate(wp.fine)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Wps;