import { sleep } from 'openai/core';
import testCreds from './.creds.json';
import { handler as openpipeHandler } from './reportToOpenPipe';
import { PluginParameters } from '../types';

describe('openpipe handler', () => {
  it('reports a log to OpenPipe', async () => {
    const eventType = 'afterRequestHook';
    const context = {
      request: { text: 'this is a request string' },
      response: { text: 'this is a response string' },
    };
    const parameters: PluginParameters = {
      tags: { prompt_id: 'test_portkey' },
      credentials: testCreds,
    };

    const result = await openpipeHandler(context, parameters, eventType);

    expect(result).toBeDefined();
    expect(result.verdict).toBe(true);
    expect(result.error).toBeNull();
  });
});
