import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import * as A from '../actions'

import {color, border} from '../../styles/variables'
import {TableColumn as Col} from '../../components/layout/responsive'

import {SpinnerIcon} from '../../components/icons'
import FetchingFailed from './fetching-failed'
import NoItems from './no-items'
import ListItem from './messages-list-item'
import Foot from './messages-list-foot'

const Container = styled.div`
  position: relative;
  min-height: 100px;
`;

const FetchingSpinnerIcon = styled(SpinnerIcon)`
  position: absolute;
  left: 50%;
  top: 50px;
  color: ${color.lightGray};
`;

const Head = styled.thead`
  border-bottom: ${border.dashedGray};
`;

const Body = styled.tbody`
`;

const TH = styled.th`
  border-top: 1px solid #ddd;
  padding: 10px 10px 5px;
  word-break: break-all;
  vertical-align: middle;
  text-align: left;
`;

const Table = styled.table`
  min-height: 100px;
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 14px;
  
  ${Body} {
    opacity: ${props => props.fetching ? '.6' : '1'};
  }
`;

export class MessagesList extends Component {
  componentDidMount() {
    const {init} = this.props;

    init && init();
  }

  handleTryAgainClick = () => {
    const {fetch, offset} = this.props;

    fetch && fetch({offset});
  };

  render() {
    const {
      fetching, fetchingFailed,
      items,
      totalCount, offset,
      prevPage, nextPage,
      limit,
    } = this.props;

    const hasItems = items && !!items.length;
    const displayNoItems = !fetching && !fetchingFailed && !hasItems;
    const displayItems = !fetchingFailed && hasItems;

    return (
      <Container>
        {fetching && <FetchingSpinnerIcon size={40}/>}
        <Table fetching={fetching}>
          <colgroup>
            <Col/>
            <Col sm={2}/>
            <Col sm={3}/>
            <Col/>
            <Col/>
          </colgroup>
          <Head>
            <tr>
              <TH>Type</TH>
              <TH>Recipient</TH>
              <TH>Message</TH>
              <TH>Status</TH>
              <TH>Date</TH>
            </tr>
          </Head>
          <Body>
          {fetchingFailed && <FetchingFailed onTryAgainClick={this.handleTryAgainClick}/>}
          {displayNoItems && <NoItems onTryAgainClick={this.handleTryAgainClick}/>}
          {displayItems && items.map(x => <ListItem key={x.id} item={x}/>)}
          </Body>
          {displayItems &&
          (
            <Foot offset={offset} itemsPerPage={limit} totalCount={totalCount}
                  onLeftArrowClick={prevPage}
                  onRightArrowClick={nextPage}
            />
          )}
        </Table>
      </Container>
    )
  }
}

MessagesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  fetching: PropTypes.bool,
  fetchingFailed: PropTypes.bool,

  init: PropTypes.func,
  fetch: PropTypes.func,
  prevPage: PropTypes.func,
  nextPage: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {
    messagesList: {
      fetching,
      fetchingFailed,
      items,
      totalCount,
      offset,
      limit,
    },
  } = state;

  return {
    fetching,
    fetchingFailed,
    items,
    totalCount,
    offset,
    limit,
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(A, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList)
