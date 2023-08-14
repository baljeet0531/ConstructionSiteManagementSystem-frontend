import React from 'react';
import { TActions, TUserRole } from '../Types/Auth';
import { initActions } from '../Constants/Auth';

export const ActionsContext = React.createContext<TActions>(initActions);
export const RolesContext = React.createContext<TUserRole | ''>('');
