// import * as R from 'ramda';
// import { HookProps } from 'feathers-hooks';

// export const processMessage = () => async <T>(hook: HookProps<T>): Promise<HookProps<T>> {
//   // HookProps had like params, data, result... didn't something abstract over these? ideally I wanna reduce this to a lambda.
//   let { params: { user } /*, data: { text } */ } = hook;
//   return R.evolve({ data: ({ text }) => ({
//     text: text.substring(0, 400).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'),
//     userId: user._id,
//     createdAt: new Date().getTime(),
//   }) })(hook);
// };
