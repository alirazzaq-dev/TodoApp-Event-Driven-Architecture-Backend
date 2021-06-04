import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as TodoEventBridgeBackEnd from '../lib/todo_event_bridge_back_end-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new TodoEventBridgeBackEnd.TodoEventBridgeBackEndStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
