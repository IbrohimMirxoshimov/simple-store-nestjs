import { createHmac } from 'crypto';

export function validateTelegramMiniAppInitData(
  bot_token: string,
  telegram_init_data: string,
) {
  const initData = new URLSearchParams(telegram_init_data);

  initData.sort();

  const hash = initData.get('hash');
  initData.delete('hash');

  const dataToCheck = [...initData.entries()]
    .map(([key, value]) => key + '=' + value)
    .join('\n');

  const secretKey = createHmac('sha256', 'WebAppData')
    .update(bot_token)
    .digest();

  const _hash = createHmac('sha256', secretKey)
    .update(dataToCheck)
    .digest('hex');

  return hash === _hash;
}
