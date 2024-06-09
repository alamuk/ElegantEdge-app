/// feature flags =
//
// const featureFlags = {
//     hasAccessToFeatureA: true,
//     hasAccessToFeatureB: false,
// }

// const flag1 = {};

const featureFlags = ['hasAccessToFeatureA', 'hasAccessToFeatureB'];

// featureFlags.forEach( el => flag1[el] = true);

// const newObject = {
//     hasAccessToFeatureA: true,
//     hasAccessToFeatureB: true
// }

// Is there a way to do the above with reduce in one line
// const flag1 = featureFlags.reduce((obj, el) => {
//     return { ...obj ,[el]: true};
// }, {});

const flag1 = featureFlags.reduce((obj, el) => ({ ...obj, [el]: true }), {});

const function1 = () => ({ prop1: 'value', prop2: 'value' });
