import React from 'react';
import { TActions } from '../Types/Auth';
import { initActions } from '../Constants/Auth';

export const ActionsContext = React.createContext<TActions>(initActions);
