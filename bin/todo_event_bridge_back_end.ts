#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TodoEventBridgeBackEndStack } from '../lib/todo_event_bridge_back_end-stack';
import { TodoEventBridgeFrontEndStack } from '../lib/todo_event_bridge_back_end-stack';

const app = new cdk.App();
new TodoEventBridgeBackEndStack(app, 'TodoEventBridgeBackEndStack');
new TodoEventBridgeFrontEndStack(app, 'TodoEventBridgeFrontEndStack');




