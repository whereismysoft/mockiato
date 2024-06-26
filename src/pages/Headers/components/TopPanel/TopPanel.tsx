import React, { FC } from 'react';
import { Button, Group, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { nanoid } from 'nanoid';
import { Header } from '~/components/Header';
import { THeader, THeadersProfile, THeaderStatus } from '~/types';
import { ProfilesActions } from '../ProfilesActions';
import { changeProfileStatus, deleteProfile, setLastActive } from '../../helpers';
import { ProfileMenu } from '../ProfilesActions/components/ProfileMenu';

interface TopPanelProps {
    activeProfile: THeadersProfile;
    profiles: Record<string, THeadersProfile>;
    setProfiles: (val: Record<string, THeadersProfile>) => void;
    onHeaderAdd: (header: THeader) => void;
    onProfileAdd: () => void;
}

export const TopPanel: FC<TopPanelProps> = (props) => {
    const { profiles, activeProfile, setProfiles, onHeaderAdd, onProfileAdd } = props;

    const handleChangeProfileStatus = (id: string, status: THeaderStatus): void => {
        setProfiles(changeProfileStatus(profiles, id, status));
        showNotification({
            message: `Profile ${status}`,
            color: 'green',
        });
    };

    const handleDeleteProfile = (id: string): void => {
        setProfiles(deleteProfile(profiles, id));
        showNotification({
            message: 'Profile deleted',
            color: 'green',
        });
    };

    const handleChangeActiveProfile = (id: string): void => {
        setProfiles(setLastActive(profiles, id));
    };

    const handleAddHeader = () => {
        onHeaderAdd({
            id: nanoid(),
            key: '',
            value: '',
            type: 'request',
            isActive: true,
        });
    };

    return (
        <Header
            title={
                <Group gap="sm">
                    <Text
                        fz="sm"
                        fw={500}
                    >
                        Request Headers
                    </Text>

                    {activeProfile && (
                        <ProfilesActions
                            profiles={profiles}
                            activeProfile={activeProfile}
                            onChangeActive={handleChangeActiveProfile}
                        />
                    )}
                </Group>
            }
        >
            {activeProfile && (
                <Group gap="xs">
                    <Button
                        leftSection={<IconPlus size={16} />}
                        size="compact-xs"
                        title="Add Header"
                        onClick={handleAddHeader}
                    >
                        Add Header
                    </Button>

                    <ProfileMenu
                        id={activeProfile.id}
                        name={activeProfile.name}
                        status={activeProfile.status}
                        onAdd={onProfileAdd}
                        onDelete={handleDeleteProfile}
                        onChangeStatus={handleChangeProfileStatus}
                    />
                </Group>
            )}
        </Header>
    );
};
