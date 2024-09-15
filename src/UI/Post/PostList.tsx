import React from 'react';
import { ProList } from "@ant-design/pro-components";
import { PostGet } from "../../Lib/typeDefinition";
import { NavLink } from "react-router-dom";

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
};

// Mock data
const mockPosts: PostGet[] = [
  {
    ID: 1,
    CreatedTime: "2023-09-15T12:00:00Z",
    UpdatedTime: "2023-09-15T12:00:00Z",
    Title: "First Post",
    AuthorId: 1,
    AuthorName: "user1",
    Gender: "male",
    Motto: "Hello world",
    LastLoginTime: "2023-09-15T10:00:00Z",
    Avatar: "",
    NumOfPosts: 1,
    UserClass: 1,
    Content: "This is the content of the first post",
    Floor: 1,
    IsLocked: "false"
  },
  {
    ID: 2,
    CreatedTime: "2023-09-15T13:00:00Z",
    UpdatedTime: "2023-09-15T13:00:00Z",
    Title: "Second Post",
    AuthorId: 2,
    AuthorName: "user2",
    Gender: "female",
    Motto: "Nice to meet you",
    LastLoginTime: "2023-09-15T11:00:00Z",
    Avatar: "",
    NumOfPosts: 1,
    UserClass: 1,
    Content: "This is the content of the second post",
    Floor: 1,
    IsLocked: "false"
  },
];

export async function GetPostData(params: Record<string, any> = {}) {
  console.log("Get Data Once");
  console.log(params);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const pageSize: number = params.pageSize || 5;
  const current: number = params.current || 1;
  const start = (current - 1) * pageSize;
  const end = start + pageSize;

  const paginatedData = mockPosts.slice(start, end);

  const ResponseData = {
    data: paginatedData,
    success: true,
    page: current,
    total: mockPosts.length,
  };
  console.log(ResponseData);
  return ResponseData;
}

const PostList: React.FC = () => {
  return (
    <ProList<PostGet>
      search={{
        filterType: "light",
      }}
      rowKey="ID"
      headerTitle="帖子"
      request={GetPostData}
      showActions="hover"
      metas={{
        title: {
          dataIndex: "Title",
          render: (_, row) => {
            return <NavLink to={`/PostPage/${row.ID}/${row.Title}`}>{row.Title}</NavLink>;
          },
        },
        avatar: {
          dataIndex: "Avatar",
          search: false,
        },
        description: {
          dataIndex: "Content",
          search: false,
        },
        subTitle: {
          dataIndex: "AuthorName",
          render: (_, row) => {
            return <>Author:{row.AuthorName},Date:{new Date(row.UpdatedTime).toLocaleString(undefined,options)}</>;
          },
          search: false,
        },
      }}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default PostList;


// import { ProList } from "@ant-design/pro-components";
// import { PostGet } from "../../Lib/typeDefinition";
// import mrequest from "umi-request";
// import { NavLink } from "react-router-dom";
// import { ipAddress } from "../../App";


// const options: Intl.DateTimeFormatOptions = {
//   year: 'numeric',
//   month: 'numeric', // 使用 'numeric' 或 'long' 根据你的需要
//   day: 'numeric',
//   hour: '2-digit',
//   minute: '2-digit',
//   second: '2-digit',
//   hour12: false // 使用 24 小时制，如果想使用 12 小时制可设为 true
// };


// export async function GetPostData(params = {} as Record<string, any>) {
//   console.log("Get Data Once");
//   console.log(params);
//   const Response = await mrequest<{ data: PostGet[] }>(
//     `http://${ipAddress}:8000/posts`,
//     {
//       params,
//     }
//   );
//   const pageSize: number = params.pageSize;
//   const ResponseData = {
//     data: Response.data,
//     success: true,
//     page: Math.ceil(Response.data.length / pageSize),
//     total: Response.data.length,
//   };
//   console.log(ResponseData);
//   return ResponseData;
// }
// const PostList = () => {
//   return (
//     <ProList<PostGet>
//       search={{
//         filterType: "light",
//       }}
//       rowKey="name"
//       headerTitle="帖子"
//       request={GetPostData}
//       showActions="hover"
//       metas={{
//         title: {
//           dataIndex: "Title",
//           render: (_, row) => {
//             return <NavLink to={`/PostPage/${row.ID}/${row.Title}`}>{row.Title}</NavLink>;
//           },
//         },
//         avatar: {
//           dataIndex: "Avatar",
//           search: false,
//         },
//         description: {
//           dataIndex: "Content",
//           search: false,
//         },
//         subTitle: {
//           dataIndex: "AuthorName",
//           render: (_, row) => {
//             return <>Author:{row.AuthorName},Date:{new Date(row.UpdatedTime).toLocaleString(undefined,options)}</>;
//           },
//           search: false,
//         },
//       }}
//       pagination={{
//         pageSize: 5,
//       }}
//     />
//   );
// };

// export default PostList;
