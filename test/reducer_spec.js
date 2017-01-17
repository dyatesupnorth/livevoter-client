import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Con Air','Gone In 60 Seconds'),
          tally: Map({"Con Air": 4})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Con Air','Gone In 60 Seconds'],
        tally: {"Con Air": 4}
      }
    }));

  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Con Air', 'Gone In 60 Seconds'],
          tally: {"Con Air": 1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Con Air', 'Gone In 60 Seconds'],
        tally: {"Con Air": 1}
      }
    }));
  });
  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Con Air','Gone In 60 Seconds'],
          tally: {"Con Air": 4}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Con Air','Gone In 60 Seconds'],
        tally: {"Con Air": 4}
      }

    }));
  })
  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Con Air','Gone In 60 Seconds'],
        tally: {"Con Air":1}
      }
    });
    const action = {type: 'VOTE', entry: 'Con Air'};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote:{
        pair:['Con Air','Gone In 60 Seconds'],
        tally: {"Con Air": 1}

      },
      hasVoted: "Con Air"
    }))

  });
  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Con Air', 'Gone In 60 Seconds'],
        tally: {"Con Air": 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Matchstick Men'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Con Air', 'Gone In 60 Seconds'],
        tally: {"Con Air": 1}
      }
    }));
  });
  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Con Air', 'Gone In 60 Seconds'],
        tally: {"Con Air": 1}
      },
      hasVoted: 'Con Air'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Matchstick Men', 'The Rock']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Matchstick Men', 'The Rock']
      }
    }));
  });

});

