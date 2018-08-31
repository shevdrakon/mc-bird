import {combineReducers} from 'redux'

import application from './application/reducer'
import quickMessage from './quick-message/reducer'
import messagesList from './messages/reducer'
import contactsList from './contacts/reducer'

export default combineReducers({
  application,
  quickMessage,
  messagesList,
  contactsList,
});
