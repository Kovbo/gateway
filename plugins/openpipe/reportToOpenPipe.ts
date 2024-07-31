import { PluginContext, PluginHandler, PluginParameters } from '../types';
import { post } from '../utils';

const OPENPIPE_REPORT_URL = 'https://app.openpipe.ai/api/v1/report';

export const handler: PluginHandler = async (
  context: PluginContext,
  parameters: PluginParameters
) => {
  let error = null;

  try {
    const logToSend = {
      requestedAt: Date.now() - 1050,
      receivedAt: Date.now(),
      reqPayload: context.request,
      respPayload: context.response,
      statusCode: 200,
      tags: parameters.tags ?? {},
    };

    post(OPENPIPE_REPORT_URL, logToSend, {
      headers: {
        Authorization: `Bearer ${parameters.credentials?.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (e: any) {
    delete e.stack;
    error = e;
  }

  return { error, verdict: true };
};
