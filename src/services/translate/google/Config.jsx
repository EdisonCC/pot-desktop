import { Input, Button } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import { useConfig } from '../../../hooks/useConfig';
import { useToastStyle } from '../../../hooks';
import { translate } from './index';
import { Language } from './index';

export function Config(props) {
    const { updateServiceList, onClose } = props;
    const [config, setConfig] = useConfig(
        'google',
        {
            custom_url: 'https://translate.google.com',
        },
        { sync: false }
    );
    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation();
    const toastStyle = useToastStyle();

    return (
        config !== null && (
            <>
                <Toaster />
                <div className={'config-item'}>
                    <h3 className='my-auto'>{t('services.translate.google.custom_url')}</h3>
                    <Input
                        value={config['custom_url']}
                        variant='bordered'
                        className='max-w-[50%]'
                        onValueChange={(value) => {
                            setConfig({
                                ...config,
                                custom_url: value,
                            });
                        }}
                    />
                </div>
                <div>
                    <Button
                        isLoading={isLoading}
                        color='primary'
                        fullWidth
                        onPress={() => {
                            setIsLoading(true);
                            translate('hello', Language.auto, Language.zh_cn, { config }).then(
                                () => {
                                    setIsLoading(false);
                                    setConfig(config, true);
                                    updateServiceList('google');
                                    onClose();
                                },
                                (e) => {
                                    setIsLoading(false);
                                    toast.error(t('config.service.test_failed') + e.toString(), { style: toastStyle });
                                }
                            );
                        }}
                    >
                        {t('common.save')}
                    </Button>
                </div>
            </>
        )
    );
}
