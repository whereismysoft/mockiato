import React, { useMemo } from 'react';
import { Button, Group, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import styles from './Settings..module.css';
import { useStore } from '../../hooks/useStore';
import { Card } from '../../components/Card';

export const Settings = () => {
    const [logs, setLogs] = useStore('logs');
    const [mocks, setMocks] = useStore('mocks');

    const isClearLogsDisabled = useMemo(() => logs === null || logs.length === 0, [logs]);
    const isClearMocksDisabled = useMemo(() => mocks === null || mocks.length === 0, [mocks]);

    const handleClearAllLogs = () => {
        setLogs([]);
    };

    const handleClearAllMocks = () => {
        setMocks([]);
    };

    return (
        <Group position="center">
            <Card className={styles.paper}>
                <Text fz="md" fw={700}>General settings</Text>

                <div className={styles.setting}>
                    <div>
                        <Text size="sm" weight={500}>Mocks</Text>
                        <Text size="sm" c="dimmed">
                            All mocks for all hosts
                        </Text>
                    </div>
                    <Button
                        size="xs"
                        variant="outline"
                        color="red"
                        compact
                        leftIcon={<IconTrash size={16} />}
                        disabled={isClearMocksDisabled}
                        onClick={handleClearAllMocks}
                    >
                        Clear all
                    </Button>
                </div>

                <div className={styles.setting}>
                    <div>
                        <Text size="sm" weight={500}>Logs of mocks</Text>
                        <Text size="sm" c="dimmed">
                            Data about requests that were intercepted and replaced with mocks for all hosts
                        </Text>
                    </div>
                    <Button
                        size="xs"
                        variant="outline"
                        color="red"
                        compact
                        leftIcon={<IconTrash size={16} />}
                        disabled={isClearLogsDisabled}
                        onClick={handleClearAllLogs}
                    >
                        Clear all
                    </Button>
                </div>
            </Card>
        </Group>
    );
};
