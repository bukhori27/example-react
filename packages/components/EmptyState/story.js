import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import EmptyState from '../EmptyState'

storiesOf('EmptyState', module).add('Default', () => 
	<EmptyState 
    Value={'Belum ada komisi'}
    srcImg={'https://img.icons8.com/material-outlined/24/000000/truck.png'}
    styleImg={styleEmptyState}
    styleValue={StyleValue}
/>);
