import { Provider } from '@nestjs/common';

export const MapProvider: Provider = {
  provide: 'ACTIVE_SESSIONS_MAP',
  useValue: new Map<string, string>(),
};