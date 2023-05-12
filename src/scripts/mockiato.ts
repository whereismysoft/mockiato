import { nanoid } from 'nanoid';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import xhook from '../xhook';
import {
    TRequest,
    TMock,
    TMockResponseDTO,
    TXhookRequest,
} from '../types';
import { sendMessage, listenMessage } from '../services/message';
import { MessageBus } from '../services/messageBus';
import { showAlert, createStack } from '../services/alert';

type TXhookCallback = (response?: unknown) => void

const messageBus = new MessageBus();

listenMessage<TMockResponseDTO>('mockChecked', (response) => {
    messageBus.dispatch(response.messageId, response.mock);
});

const send = (request: TXhookRequest): Promise<TMock | undefined> => {
    const messageId = nanoid();

    const message: TRequest = {
        messageId,
        url: request.url,
        method: request.method,
    };

    sendMessage<TRequest>('intercepted', message);

    return new Promise<TMock | undefined>((resolve) => {
        messageBus.addListener(messageId, resolve);
    });
};

xhook.before(async (request: TXhookRequest, callback: TXhookCallback) => {
    let mock;

    try {
        mock = await send(request);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        callback();
        return;
    }

    if (!mock) {
        callback();
        return;
    }

    const response = {
        status: mock.httpStatusCode,
        text: mock.response,
        type: mock.responseType,
    };

    if (mock.delay) {
        setTimeout(() => {
            callback(response);
            showAlert(request);
        }, mock.delay);
    } else {
        callback(response);
        showAlert(request);
    }
});

createStack();

export {};