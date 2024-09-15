import React, { useEffect, useState } from 'react';
import { ProList } from "@ant-design/pro-components";
import { ReplyGet } from "../../Lib/typeDefinition";

// Mock data (you can expand this as needed)
const mockReplies: ReplyGet[] = [
  {
    ID: 1,
    CreatedTime: "2023-09-15T14:00:00Z",
    UpdatedTime: "2023-09-15T14:00:00Z",
    PostId: 1,
    AuthorId: 2,
    AuthorName: "user2",
    Gender: "female",
    Motto: "Nice to meet you",
    LastLoginTime: "2023-09-15T11:00:00Z",
    Avatar: "",
    NumOfPosts: 1,
    UserClass: 1,
    Content: "This is a reply to the first post",
    Floor: 1,
    ReplyTo: 0
  },
  {
    ID: 2,
    CreatedTime: "2023-09-15T15:00:00Z",
    UpdatedTime: "2023-09-15T15:00:00Z",
    PostId: 1,
    AuthorId: 1,
    AuthorName: "user1",
    Gender: "male",
    Motto: "Hello world",
    LastLoginTime: "2023-09-15T10:00:00Z",
    Avatar: "",
    NumOfPosts: 2,
    UserClass: 1,
    Content: "This is another reply to the first post",
    Floor: 2,
    ReplyTo: 1
  },
];

export async function GetReplyData(params: Record<string, any> = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const pageSize: number = params.pageSize || 5;
  const current: number = params.current || 1;
  const start = (current - 1) * pageSize;
  const end = start + pageSize;

  // Filter replies based on the current ShareId
  const filteredReplies = mockReplies.filter(reply => reply.PostId === params.ShareId);
  const paginatedData = filteredReplies.slice(start, end);

  const ResponseData = {
    data: paginatedData,
    success: true,
    page: current,
    total: filteredReplies.length,
  };
  console.log(ResponseData);
  return ResponseData;
}

export type ReplyProps = {
    ShareId: number;
    Title: string;
};

const ReplyList: React.FC<ReplyProps> = ({ ShareId, Title }) => {
    const [currentShareId, setCurrentShareId] = useState(ShareId);

    useEffect(() => {
        setCurrentShareId(ShareId);
    }, [ShareId]);

    return (
        <ProList<ReplyGet>
            search={{
                filterType: "light",
            }}
            rowKey="ID"
            headerTitle={Title}
            request={(params) => GetReplyData({ ...params, ShareId: currentShareId })}
            pagination={{
                pageSize: 5,
            }}
            showActions="hover"
            metas={{
                subTitle: {
                    dataIndex: "AuthorName",
                    title: "用户",
                },
                avatar: {
                    dataIndex: "Avatar",
                    search: false,
                },
                description: {
                    dataIndex: "Content",
                    search: false,
                },
            }}
        />
    );
};

export default ReplyList;

// import { ProList } from "@ant-design/pro-components";
// import mrequest from "umi-request";
// import {ReplyGet} from "../../Lib/typeDefinition";
// import {useEffect} from "react";
// import { ipAddress } from "../../App";

// var PageShareId:number;



// export async function GetReplyData(params = {} as Record<string, any>) {
//     const Response = await mrequest<{ data: ReplyGet[] }>(
//       `http://${ipAddress}:8000/posts/${PageShareId}`,
//       {
//         params,
//       }
//     );
//     const pageSize:number = params.pageSize;
//     const ResponseData = {
//       data: Response.data,
//       success: true,
//       page: Math.ceil(Response.data.length/pageSize),
//       total: Response.data.length,
//     };
//     console.log(ResponseData);
//     return ResponseData;
//   }

// export type ReplyProps = {
//     ShareId:number;
//     Title:string;
// };

// const ReplyList:React.FC<ReplyProps> = ({ShareId,Title}) => {
//     useEffect(() => {
//         PageShareId = ShareId
//     }, [ShareId]);
//     return (
//         <ProList<ReplyGet>
//             search={{
//                 filterType: "light",
//             }}
//             rowKey="name"
//             headerTitle= {Title}
//             request={GetReplyData}
//             pagination={{
//                 pageSize: 5,
//             }}
//             showActions="hover"
            
//             metas={{
//                 subTitle: {
//                     dataIndex: "AuthorName",
//                     title: "用户",
//                 },
//                 avatar: {
//                     dataIndex: "Avatar",
//                     search: false,
//                 },
//                 description: {
//                     dataIndex: "Content",
//                     search: false,
//                 },
                
//             }}
//         />
//     );
// };

// export default ReplyList;
