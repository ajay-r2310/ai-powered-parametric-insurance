import { Notification } from '../../types';

export const createNotification = (
  title: string,
  message: string,
  severity: Notification['severity'],
  channel: Notification['channel'] = 'IN_APP'
): Notification => {
  return {
    id: `NOTIF-${Date.now().toString().slice(-6)}`,
    title,
    message,
    severity,
    timestamp: 'Just now',
    read: false,
    channel,
  };
};
