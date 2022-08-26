export const userInfos = 'USER_INFOS';
export const walletInfos = 'WALLET_INFOS';

export function userInfosAction(payload) {
  return {
    type: userInfos,
    payload,
  };
}
