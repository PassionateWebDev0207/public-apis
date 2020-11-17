import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart } from './charts';
import axios from '../utils/axios';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const PageTwo = () => {
  const query = useSelector(state => state.query);
  const [ready, setReady] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    if (query && !ready) {
      axios.get(`/entries?category=${query}`).then(res => {
        const categories = 
          res.data.entries.reduce((entry, { Category: item }) => (entry[item] = (entry[item] || 0) + 1, entry), {});
        const data = Object.keys(categories).map(key => ({
          name: key,
          value: categories[key]
        }));
        console.log(data);
        setCategoriesData(data);
        setReady(true);
      }).catch(err => {
        console.log(err)
        setReady(true);
      })
    }
  }, [query, ready])
  return (
    <Container fluid>
      <Row>
        <Col>
          <ChartWrapper className="mt-3 px-2 py-2">
            {ready && categoriesData.length > 0 && <AreaChart data={categoriesData} />}
          </ChartWrapper>
        </Col>
      </Row>
      <Row>
        <Col>
          <ChartWrapper className="mt-3 px-2 py-2">
            {ready && categoriesData.length > 0 && <AreaChart data={categoriesData} />}
          </ChartWrapper>
        </Col>
        <Col>
          <ChartWrapper className="mt-3 px-2 py-2">
            {ready && categoriesData.length > 0 && <AreaChart data={categoriesData} />}
          </ChartWrapper>
        </Col>
      </Row>
    </Container>
  )
}

const ChartWrapper = styled.div`
  box-shadow: 0 0 3px rgba(0, 0 ,0 , 0.3);
  border: none;
  border-radius: 4px;
`

export default React.memo(PageTwo);