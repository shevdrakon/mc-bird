import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import moment from 'moment'

import messageType from '../../constants/message-type'
import {ArrowRight, ArrowLeft} from '../../components/icons'
import {Table} from '../../components/styled/table'

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DateTD = styled(Table.td)`
  text-align: right;
`;

const RecipientTD = styled(Table.td)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const directionMap = {
  [messageType.sent]: ArrowRight,
  [messageType.received]: ArrowLeft,
};

const statusAliasMap = {
  delivery_failed: "not delivered (failed)",
  expired: "not delivered (expired)",
  delivered: "delivered",
};

class MessagesListItem extends Component {
  getCreatedDateLabel() {
    const {item: {createdDatetime}} = this.props;

    const createdDate = moment(createdDatetime);
    const createdDateIsToday = moment().diff(createdDate, 'days') === 0;

    return createdDateIsToday ? createdDate.format('hh:mm') : createdDate.format('DD-MM-YYYY');
  }

  getStatusLabel = (status) => statusAliasMap[status] || status;

  render() {
    const {item: {body, direction, recipient, status}} = this.props;

    const DirectionIcon = directionMap[direction];
    const createdDateLabel = this.getCreatedDateLabel();

    const statusLabel = this.getStatusLabel(status);

    return (
      <Table.tr>
        <Table.td>{DirectionIcon && <IconContainer><DirectionIcon size={20} /></IconContainer>}</Table.td>
        <RecipientTD>{recipient}</RecipientTD>
        <Table.td>{body}</Table.td>
        <Table.td>{statusLabel}</Table.td>
        <DateTD>{createdDateLabel}</DateTD>
      </Table.tr>
    )
  }
}

MessagesListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MessagesListItem;
