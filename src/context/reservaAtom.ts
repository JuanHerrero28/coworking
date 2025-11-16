import { atom } from 'jotai';
import { EventInput } from '@fullcalendar/core';

export const reservaAtom = atom<EventInput[]>([
  {
    id: '1',
    title: 'Evento de prueba',
    start: new Date().toISOString(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // +1 hora
  },
]);
