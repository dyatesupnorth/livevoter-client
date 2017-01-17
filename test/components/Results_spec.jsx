import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';


describe('Results', () =>{
  it('renders entries with vote counts or zero', ()=>{
    const pair = List.of('Con Air', 'Gone In 60 Seconds');
    const tally = Map({'Con Air': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map(e=> e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Con Air');

    expect(train).to.contain('Con Air');
    expect(train).to.contain('5');
    expect(days).to.contain('Gone In 60 Seconds');
    expect(days).to.contain('0');
  });

  it('invokesthe next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const pair = List.of('Con Air', 'Gone In 60 Seconds');
    const component = renderIntoDocument(
      <Results pair={pair}
      tally={Map()}
      next={next} />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  })
  it('renders he winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner ="Con Air"
      pair={["Con Air", "Gone In 60 Seconds"]}
      tally={Map()}/>
    )
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Con Air');
  })
})
