import { connect } from 'react-redux';

import { debounce } from 'lodash';

import { openModal } from 'flavours/glitch/actions/modal';
import { fetchPoll, vote } from 'flavours/glitch/actions/polls';
import Poll from 'flavours/glitch/components/poll';

const mapDispatchToProps = (dispatch, { pollId }) => ({
  refresh: debounce(
    () => {
      dispatch(fetchPoll({ pollId }));
    },
    1000,
    { leading: true },
  ),

  onVote (choices) {
    dispatch(vote({ pollId, choices }));
  },

  onInteractionModal (type, status) {
    dispatch(openModal({
      modalType: 'INTERACTION',
      modalProps: {
        type,
        accountId: status.getIn(['account', 'id']),
        url: status.get('uri'),
      },
    }));
  }
});

const mapStateToProps = (state, { pollId }) => ({
  poll: state.polls.get(pollId),
});

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
