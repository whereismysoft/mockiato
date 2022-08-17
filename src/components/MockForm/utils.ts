import { THeader, TMock } from '../../types';

export const trimHeaders = (mock: TMock): TMock => ({
    ...mock,
    responseHeaders: mock.responseHeaders.reduce((acc: THeader[], header: THeader) => {
        if (header.key !== '') {
            return [...acc, header];
        }
        return acc;
    }, []),
});