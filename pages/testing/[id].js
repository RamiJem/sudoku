import db from '../../db'

export default function Hi ({ sudoku }) {
  console.log(sudoku)
  return <div>
    <h1>{sudoku.date}</h1>
    <h2>{sudoku.puzzle}</h2>
    <h3>{sudoku.solution}</h3>
  </div>
  // console.log(req.params)
  // const id = req.params.id;
 
  // // Allow a blog post to get its number of likes and views
  // const params = {
  //   TableName: 'Sudoku',
  //   Key: {
  //     date: id
  //   }
  // };

  // db.get(params, function (err, data) {
  //   if (err) {
  //     console.log('Error', err);
  //   } else {
  //     // send the json response from the callback
  //     console.log('data: ', data)
  //     res.json(data);
  //   }
  // });
  
}


// import styles from '../../components/Layout.module.css'
// import SudokuBoard from '../../components/SudokuBoard'
// import NumberPad from '../../components/NumberPad'
// import row from '../../utils/col'
// import col from '../../utils/row'
// import unit from '../../utils/unit'
// import conflict from '../../utils/conflict'

// import { useState, useEffect } from 'react'

// import { withSSRContext } from 'aws-amplify'
// import { Sudoku } from '../../src/models'
// import { useRouter } from 'next/router'


// export default function SudokuComponent({ sudoku }) {
//   console.log('sudoku in func: ', sudoku)
//   const router = useRouter()
//   if (router.isFallback) {
//     return <div>Loading...</div>
//   }
//   return (
//       <div>
//           {/* <h1>
//               {sudoku.date}
//           </h1>
//         <div>
//         {sudoku.puzzle} 
//         <br/>
//         {sudoku.solution}
//         </div> */}
//         hi
//       </div>
//   )
// }
// export async function getStaticPaths(req) {
//   // db.get(params, function (err, data) {
//   //   if (err) {
//   //     console.log('Error', err);
//   //   } else {
//   //     // send the json response from the callback
//   //     console.log('data: ', data)
//   //     res.json(data);
//   //   }
//   // }) 
//   const paths = [({ params: { id: "2021-01-01" }}), ({ params: { id: "2021-01-02"}})]
//   return {
//     paths,
//     fallback: true,
//   }
// }

export async function getStaticProps (req) {

  const params = {
    TableName: 'Sudoku',
    Key: {
      date: req.params.id
    }
  };

  let sudoku
  try {
     sudoku = await db.get(params).promise()
  } catch(err) {
    console.log(err)
  }

  return {
    props: {
      sudoku: sudoku.Item
    }
  }
}

export async function getStaticPaths(req) {
  const params = {
    TableName: "Sudoku",
  };
  const scanResults = [];
  let items;
  do{
       items =  await db.scan(params).promise();
       items.Items.forEach((item) => scanResults.push(item));
       params.ExclusiveStartKey  = items.LastEvaluatedKey;
  }while(typeof items.LastEvaluatedKey !== "undefined");
  
  const paths = scanResults.map(sudoku => ({params: {id: sudoku.date}}))
  return {
    paths,
    fallback: true,
  }
}

// export async function getStaticProps (req) {
//   console.log('getstatic PROPS')
//   const { DataStore } = withSSRContext(req)
//   const { params } = req
//   const { id } = params
//   const sudoku = await DataStore.query(Sudoku, id)
  
//   return {
//     props: {
//       sudoku: JSON.parse(JSON.stringify(sudoku[0]))
//     },
//     revalidate: 1
//   }

// }