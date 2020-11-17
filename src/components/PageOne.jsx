import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import axios from '../utils/axios'
import { setQuery } from '../actions'
import {
  Container,
  InputGroup,
  FormControl,
  Spinner,
  Table,
  Pagination
} from 'react-bootstrap';

const PageOne = () => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.query);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCnt, setPageCnt] = useState(1);
  const [cntPerPage, setCntPerCount] = useState(30)
  const [pageItems, setPageItems] = useState([]);

  const handleChangeSearchStr = (event) => {
    setSearchStr(event.target.value);
    setCntPerCount(30);
    setItems([]);
    setPageItems([]);
    setPageCnt(1);
  }

  const handleClickPageItem = (page) => {
    setPage(page);
    if (page * cntPerPage < items.length) {
      setPageItems(items.slice((page - 1) * cntPerPage, page * cntPerPage))
    } else {
      setPageItems(items.slice((page - 1) * cntPerPage, items.length))
    }
  }

  const delayedSearchStr = useCallback(_.debounce(() => {
    dispatch(setQuery(searchStr));
    setLoading(true);
    if (searchStr) {
      axios.get(`/entries?category=${searchStr}`).then(res => {
        if (res.data.count > 0) {
          setItems(res.data.entries);
          setPage(1);
          if (res.data.count < cntPerPage) {
            setPageItems(res.data.entries)
            setPageCnt(1);
          } else {
            setPageItems(res.data.entries.slice(0, cntPerPage))
            if (res.data.count % cntPerPage > 0) setPageCnt(res.data.count / cntPerPage + 1)
            else setPageCnt(res.data.count / cntPerPage);
          }
        } else { 
          setItems([]);
          setPageCnt(1);
          setPageItems([]);
        }
        setLoading(false);
      }).catch(err => {
        setItems([]);
        setPageCnt(1);
        setPageItems([]);
        setLoading(false);
      })
    } else {
      setItems([]);
      setPageCnt(1);
      setPageItems([]);
      setLoading(false);
    }
  }, 500), [searchStr])

  useEffect(() => {
    if (query && !ready) {
      setCntPerCount(30);
      setItems([]);
      setPageItems([]);
      setPageCnt(1);
      setSearchStr(query);
      setReady(true);
    }
  }, [query, ready])

  useEffect(() => {
    delayedSearchStr();
    return delayedSearchStr.cancel;
  }, [searchStr, delayedSearchStr])

  return (
    <Container fluid>
      <InputGroup className="mb-3 mt-3">
        <FormControl
          placeholder="Input search word ..."
          arial-label="Input Sea"
          aria-describedby="basic-addon1"
          value={searchStr}
          onChange={handleChangeSearchStr}
        />
      </InputGroup>
      {ready && loading && <Spinner animation="border" variant="primary" />}
      {ready && !loading && (
        <Pagination>
          {_.range(1, pageCnt).map(pageNumber => (
            <Pagination.Item
              key={pageNumber}
              active={page === pageNumber}
              onClick={() => handleClickPageItem(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
      {ready && !loading && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((pageItem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{pageItem.Category}</td>
                <td>{pageItem.Description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default React.memo(PageOne);