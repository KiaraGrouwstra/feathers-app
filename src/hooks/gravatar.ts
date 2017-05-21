// import * as crypto from 'crypto';
// import { HookProps } from 'feathers-hooks';

// const gravatarUrl = 'https://s.gravatar.com/avatar';
// const query = 's=60';

// export const gravatar = () => async (hook: HookProps<any>) => {
//     const { email } = hook.data;
//     const hash = crypto.createHash('md5').update(email).digest('hex');

//     hook.data.avatar = `${gravatarUrl}/${hash}?${query}`;
//     return hook;
//   };
// };
