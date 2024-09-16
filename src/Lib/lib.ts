import {
    Post,
    ReplyGet,
    ReplyRequest,
    PostGet,
    PostRequest,
    Reply,
    MakeReplyType,
    GetUserType,
    ShareAndReplies,
    HTTPStatus,
    gender,
    userclass
  } from './typeDefinition';
  import { FieldType } from "../Pages/Login";
  import { RegisterFieldType } from "../Pages/Register";
// import {
//     HTTPStatus,
//     GetUserType,
//     PostRequest, ReplyRequest
// } from './typeDefinition';
// import axios from "axios";
// import { FieldType } from "../Pages/Login";
// import storageUtils from "./storageUtils";
// import { RegisterFieldType } from "../Pages/Register";
// import { ipAddress } from '../App';

// export async function MakePost(post: PostRequest): Promise<HTTPStatus> {
//     let statusNum: number = 0;
//     try {
//         await axios.post(`http://${ipAddress}:8000/posts`, post)
//             .then(function (response) {
//                 console.log(response);
//                 window.location.reload()
//                 return { status: statusNum }
//             }).catch(function (error) {
//                 console.log(error);
//                 return { status: statusNum }
//             });
//         return { status: statusNum }
//     } catch {
//         console.log("ERRORS BUT NOT AXIOS ERROR")
//         return { status: statusNum }
//     }
// }
// export async function MakeReply(reply: ReplyRequest): Promise<HTTPStatus> {
//     let statusNum: number = 0;
//     try {
//         await axios.post(`http://${ipAddress}:8000/posts/${reply.PostId}`, reply)
//             .then(function (response) {
//                 console.log(response);
//                 window.location.reload()
//                 return { status: statusNum }
//             }).catch(function (error) {
//                 console.log(error);
//                 return { status: statusNum }
//             });
//         return { status: statusNum }
//     } catch {
//         console.log("ERRORS BUT NOT AXIOS ERROR")
//         return { status: statusNum }
//     }
//     return { status: statusNum }
// }



// interface MyResponse {
//     data:{    UserName: string;
//         PassWord: string;
//         ID: number;}[];
//     page:number;
//     success:boolean;
//     total:number
// }

// export async function LoginFunc(values: FieldType): Promise<HTTPStatus> {
//     let statusNum: number = 0;
//     let myresponse: MyResponse | undefined;

//     try {
//         await axios.post(`http://${ipAddress}:8000/users/login`, { UserName: values.userName, PassWord: values.password }).then(function (response) {
//             myresponse = response.data
//         }).catch(function (error) {
//             console.log(error);
//         });

//         if(myresponse !== undefined){
//             if (myresponse.data[0].UserName !== undefined && myresponse.data[0].PassWord !== undefined)
//                 {
//                     console.log(myresponse)
//                     storageUtils.saveUser({ UserName:  myresponse.data[0].UserName, PassWord: myresponse.data[0].PassWord ,UserId:myresponse.data[0].ID})
//                 }
       
                
    
//             window.location.reload()
//         }
//         return { status: statusNum }
//     }
//     catch {
//         console.log("ERRORS BUT NOT AXIOS ERROR")
//         return { status: statusNum }
//     }
// }

// // export async function RegisterFunc(values:)

// export function Logout(): void {
//     if (storageUtils.getUser())
//         storageUtils.removeUser()
//     else {
//         console.log("already log out")
//     }
//     window.location.reload()
// }
export function formatDate(time: string | number) {
    if (time === null) {
        return ''
    } else {
        const date = new Date(time)
        const y = date.getFullYear()
        let m: string | number = date.getMonth() + 1
        m = m < 10 ? `0${String(m)}` : m
        let d: string | number = date.getDate()
        d = d < 10 ? `0${String(d)}` : d
        let h: string | number = date.getHours()
        h = h < 10 ? `0${String(h)}` : h
        let minute: string | number = date.getMinutes()
        minute = minute < 10 ? `0${String(minute)}` : minute
        let second: string | number = date.getSeconds()
        second = second < 10 ? `0${String(second)}` : second
        return `${String(y)}-${String(m)}-${String(d)}   ${String(h)}:${String(
            minute
        )}:${String(second)}`
    }
}

export function formatDatefordate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// export async function GetUserIdByUserName(userName: string): Promise<number> {
//     let userId: number = 0;
//     await axios.get(`http://${ipAddress}:8000/users/${userName}`).then(function (response) {
//         console.log(response.data)
//         userId = response.data
//     })

//     return userId
// }

// export async function RegisterFunc(values: RegisterFieldType): Promise<HTTPStatus> {
//     let statusNum: number = 0;
//     let myresponse: MyResponse | undefined;
//     try {
//         await axios.post(`http://${ipAddress}:8000/users/register`, {
//             UserName: values.userName,PassWord: values.password
//         }).then(function (response) {
//             myresponse = response.data
//             console.log(response);
//             statusNum = response.status;
//         }).catch(function (error) {
//             console.log(error);
//         });
//         console.log(myresponse)
//         if(myresponse !== undefined){
//                 console.log("Register and Login SUCCESS")
//                 if (myresponse.data[0].UserName !== undefined && myresponse.data[0].PassWord !== undefined)
//                     {
//                         storageUtils.saveUser({ UserName: myresponse.data[0].UserName, PassWord: myresponse.data[0].PassWord ,UserId:myresponse?.data[0].ID})
//                     }
//                 window.location.reload()
//                 return { status: statusNum }
            

//         }
//         else{
//             return {status: 0}
//         }


//     }
//     catch(e) {
//         console.log(e)
//         console.log("ERRORS BUT NOT AXIOS ERROR")
//         return { status: statusNum }
//     }
// }

// export async function GetUserDataById(userId: number): Promise<GetUserType> {

//     let result: GetUserType = {
//         UserId: -1,
//         LastLogintime: "",
//         UserName: "",
//         gender: "",
//         motto: "",
//         numofShares: -1
//     }

//     if (userId === 0)
//         return result
//     await axios.get(`http://${ipAddress}:8000/user/${userId}`).then(function (response) {
//         console.log(response.data)
//         result = response.data
//     })

//     return result
// }





  
  // Mock data
  const mockUsers: GetUserType[] = [
    { UserId: 1, LastLogintime: "2023-09-15T10:00:00Z", UserName: "user1", gender: "male", motto: "Hello world", numofShares: 2 },
    { UserId: 2, LastLogintime: "2023-09-15T11:00:00Z", UserName: "user2", gender: "female", motto: "Nice to meet you", numofShares: 1 },
  ];
  
  const mockPosts: Post[] = [
    { ShareId: 1, UserId: 1, Content: "First post content", Title: "First Post", PostTime: "2023-09-15T12:00:00Z", IsLocked: false, UserData: mockUsers[0] },
    { ShareId: 2, UserId: 2, Content: "Second post content", Title: "Second Post", PostTime: "2023-09-15T13:00:00Z", IsLocked: false, UserData: mockUsers[1] },
  ];
  
  const mockReplies: Reply[] = [
    { Content: "First reply", Floor: 1, PostTime: "2023-09-15T14:00:00Z", ReplyId: 1, ReplyTo: 0, ShareId: 1, UserId: 2, UserData: mockUsers[1] },
    { Content: "Second reply", Floor: 2, PostTime: "2023-09-15T15:00:00Z", ReplyId: 2, ReplyTo: 1, ShareId: 1, UserId: 1, UserData: mockUsers[0] },
  ];
  
  // Mock functions
  export async function MakePost(post: PostRequest): Promise<HTTPStatus> {
    const newPost: Post = {
      ShareId: mockPosts.length + 1,
      UserId: post.AuthorId,
      Content: post.Content,
      Title: post.Title,
      PostTime: new Date().toISOString(),
      IsLocked: false,
      UserData: mockUsers.find(u => u.UserId === post.AuthorId)
    };
    mockPosts.push(newPost);
    return { status: 200 };
  }
  
  export async function MakeReply(reply: ReplyRequest): Promise<HTTPStatus> {
    const newReply: Reply = {
      Content: reply.Content,
      Floor: mockReplies.filter(r => r.ShareId === reply.PostId).length + 1,
      PostTime: new Date().toISOString(),
      ReplyId: mockReplies.length + 1,
      ReplyTo: reply.ReplyTo || 0,
      ShareId: reply.PostId,
      UserId: reply.AuthorId,
      UserData: mockUsers.find(u => u.UserId === reply.AuthorId)
    };
    mockReplies.push(newReply);
    return { status: 200 };
  }
  
  export async function LoginFunc(values: FieldType): Promise<HTTPStatus> {
    const user = mockUsers.find(u => u.UserName === values.userName);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { status: 200 };
    }
    return { status: 401 };
  }
  
  export function Logout(): void {
    localStorage.removeItem('currentUser');
  }
  
  export async function RegisterFunc(values: RegisterFieldType): Promise<HTTPStatus> {
    if (!values.userName) {
        return { status: 400 }; // Bad Request - username is required
    }

    if (mockUsers.some(u => u.UserName === values.userName)) {
        return { status: 409 }; // Conflict - user already exists
    }

    const newUser: GetUserType = {
        UserId: mockUsers.length + 1,
        LastLogintime: new Date().toISOString(),
        UserName: values.userName, // Now we know this is not undefined
        gender: "Not specified",
        motto: "New user",
        numofShares: 0
    };

    mockUsers.push(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return { status: 201 };
}
  
  export async function GetUserIdByUserName(userName: string): Promise<number> {
    const user = mockUsers.find(u => u.UserName === userName);
    return user ? user.UserId : 0;
  }
  
  export async function GetUserDataById(userId: number): Promise<GetUserType> {
    const user = mockUsers.find(u => u.UserId === userId);
    if (user) {
      return { ...user, LastLogintime: new Date().toISOString() };
    }
    return {
      UserId: -1,
      LastLogintime: "",
      UserName: "",
      gender: "",
      motto: "",
      numofShares: -1
    };
  }
  
  export function GetShareAndReplies(shareId: number): ShareAndReplies {
    const share = mockPosts.filter(p => p.ShareId === shareId);
    const replies = mockReplies.filter(r => r.ShareId === shareId);
    return { share, replies };
  }