import type { AuthContextProps } from 'react-oidc-context';
import { gameAccessAtLeast, isAdmin, type StrategicGame } from '@labcabrera-rmu/rmu-react-shared-lib';

/** A game master: its owner, a master (spec 071), or an admin. Only they can award a treasure to a character. */
export const isGameMaster = (auth: AuthContextProps, game: StrategicGame | undefined): boolean =>
  isAdmin(auth) ||
  (!!game &&
    (game.access === 'owner' || game.owner === auth.user?.profile?.sub || gameAccessAtLeast(game.access, 'master')));
