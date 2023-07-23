// import React from 'react'
// import { Pagination } from 'react-bootstrap'
// import {LinkContainer} from 'react-router-bootstrap'
// import { useSearchParams } from 'react-router-dom'

// function Paginate(keyword='', page, pages, isAdmin = false) {

// const [search] = useSearchParams()

// // const rawKeyword = keyword.keyword

// const rawKeyword = search.get("keyword")

// // const pageQuery = search.get('page')
// page = keyword.page
// pages = keyword.pages

// let nonAdminUrl
// let adminUrl

// if (keyword){
//     keyword = rawKeyword
    
// }

    

//   return (
//     pages > 1 && (
//         <Pagination>
//             {[...Array(pages).keys()].map((x) => (
//                 nonAdminUrl=('/?keyword='+keyword+'&page='+x+1).toString(),
//                 adminUrl=('/admin/productlist/?keyword='+keyword+'&page='+x+1).toString(),
//                 <LinkContainer
//                     key={x + 1}
//                     to={!isAdmin ?
//                         nonAdminUrl
//                         : adminUrl
//                     }
//                 >
//                     <Pagination.Item active={x + 1 === page}>{x+1}</Pagination.Item>
//                 </LinkContainer>
//             ))}
//         </Pagination>
//     )
//   )
// }

// export default Paginate