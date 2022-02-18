// const { Client } = require("@elastic/elasticsearch");
// const { ES_HOST } = process.env;
// const client = new Client({ node: ES_HOST });

// export const createES = async (index: string, id: string, body: any) => {
//   await client.index({ index: index, id: id, body: body });
// };

// export const searchES = async (index: string, query: any) => {
//   let result: any = [];
//   let {
//     body: { hits },
//   } = await client.search({
//     index,
//     body: {
//       query: {
//         match: query,
//       },
//     },
//   });

//   if (hits?.hits && hits.hits.length > 0) {
//     for (let item of hits.hits) {
//       result.push({
//         _id: item._id,
//         type: item._index,
//         data: item._source,
//       });
//     }
//     return result;
//   }

//   return result;
// };
