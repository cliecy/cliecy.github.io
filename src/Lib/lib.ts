import {
    Post,
    Reply,
    ReplyRequest,
    PostRequest,
    GetUserType,
    ShareAndReplies,
    HTTPStatus,
} from './typeDefinition';
import { FieldType } from "../Pages/Login";
import { RegisterFieldType } from "../Pages/Register";
import { apiClient } from './api';
import storageUtils from './storageUtils';

// ==================== 帖子相关 API ====================

export async function MakePost(post: PostRequest): Promise<HTTPStatus> {
    try {
        const response = await apiClient.post('/posts', {
            title: post.Title,
            authorId: post.AuthorId,
            content: post.Content,
            floor: 0,
            isLocked: false,
            isDeleted: false,
            isTop: false,
            isInvisible: false
        });
        console.log('Post created:', response.data);
        return { status: response.status };
    } catch (error: any) {
        console.error('Error creating post:', error);
        return { status: error.response?.status || 500 };
    }
}

export async function GetAllPosts(page: number = 0, size: number = 10): Promise<any[]> {
    try {
        const response = await apiClient.get(`/posts?page=${{page}&size=${{size}`);
        return response.data.content || [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function GetPostById(postId: number): Promise<any | null> {
    try {
        const response = await apiClient.get(`/posts/${{postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

// ==================== 回复相关 API ====================

export async function MakeReply(reply: ReplyRequest): Promise<HTTPStatus> {
    try {
        const response = await apiClient.post('/replies', {
            postId: reply.PostId,
            authorId: reply.AuthorId,
            content: reply.Content,
            floor: 0,
            replyTo: reply.ReplyTo || null,
            isDeleted: false
        });
        console.log('Reply created:', response.data);
        return { status: response.status };
    } catch (error: any) {
        console.error('Error creating reply:', error);
        return { status: error.response?.status || 500 };
    }
}

export async function GetRepliesByPostId(postId: number): Promise<any[]> {
    try {
        const response = await apiClient.get(`/replies/post/${{postId}`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching replies:', error);
        return [];
    }
}

// ==================== 用户认证 API ====================

interface LoginResponse {
    success: boolean;
    message: string;
    user: any | null;
}

export async function LoginFunc(values: FieldType): Promise<HTTPStatus> {
    try {
        const response = await apiClient.post<LoginResponse>('/auth/login', {
            userName: values.userName,
            passWord: values.password
        });

        const loginData = response.data;

        if (loginData.success && loginData.user) {
            storageUtils.saveUser({
                UserName: loginData.user.userName,
                UserId: loginData.user.id
            });
            console.log('Login successful:', loginData.user);
            return { status: 200 };
        } else {
            console.error('Login failed:', loginData.message);
            return { status: 401 };
        }
    } catch (error: any) {
        console.error('Login error:', error);
        return { status: error.response?.status || 500 };
    }
}

export async function RegisterFunc(values: RegisterFieldType): Promise<HTTPStatus> {
    try {
        const response = await apiClient.post<LoginResponse>('/auth/register', {
            userName: values.userName,
            passWord: values.password,
            gender: values.gender || '未知',
            motto: '',
            avatar: ''
        });

        const registerData = response.data;

        if (registerData.success && registerData.user) {
            storageUtils.saveUser({
                UserName: registerData.user.userName,
                UserId: registerData.user.id
            });
            console.log('Registration successful:', registerData.user);
            return { status: 200 };
        } else {
            console.error('Registration failed:', registerData.message);
            return { status: 400 };
        }
    } catch (error: any) {
        console.error('Registration error:', error);
        return { status: error.response?.status || 500 };
    }
}

export function Logout(): void {
    storageUtils.removeUser();
    console.log('User logged out');
}

// ==================== 用户信息 API ====================

export async function GetUserDataById(userId: number): Promise<GetUserType> {
    try {
        const response = await apiClient.get(`/users/${{userId}`);
        const user = response.data;
        return {
            UserId: user.id,
            LastLogintime: user.lastLoginTime || new Date().toISOString(),
            UserName: user.userName,
            gender: user.gender || '未知',
            motto: user.motto || '',
            numofShares: user.numOfShares || 0
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            UserId: -1,
            LastLogintime: "",
            UserName: "",
            gender: "",
            motto: "",
            numofShares: -1
        };
    }
}

export async function GetUserIdByUserName(userName: string): Promise<number> {
    try {
        const response = await apiClient.get(`/auth/user/${{userName}`);
        return response.data?.id || 0;
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return 0;
    }
}

// ==================== 综合查询 API ====================

export async function GetShareAndReplies(shareId: number): Promise<ShareAndReplies> {
    try {
        const post = await GetPostById(shareId);
        const replies = await GetRepliesByPostId(shareId);

        const postData: Post[] = post ? [{
            ShareId: post.id,
            UserId: post.authorId,
            Content: post.content,
            Title: post.title,
            PostTime: post.createdAt,
            IsLocked: post.isLocked,
            UserData: undefined
        }] : [];

        const replyData: Reply[] = replies.map((r: any, index: number) => ({
            Content: r.content,
            Floor: r.floor || index + 1,
            PostTime: r.createdAt,
            ReplyId: r.id,
            ReplyTo: r.replyTo || 0,
            ShareId: r.postId,
            UserId: r.authorId,
            UserData: undefined
        }));

        return { share: postData, replies: replyData };
    } catch (error) {
        console.error('Error fetching post and replies:', error);
        return { share: [], replies: [] };
    }
}

// ==================== 日期格式化工具函数 ====================

export function formatDate(time: string | number) {
    if (time === null) {
        return ''
    } else {
        const date = new Date(time)
        const y = date.getFullYear()
        let m: string | number = date.getMonth() + 1
        m = m < 10 ? `0${{String(m)}` : m
        let d: string | number = date.getDate()
        d = d < 10 ? `0${{String(d)}` : d
        let h: string | number = date.getHours()
        h = h < 10 ? `0${{String(h)}` : h
        let minute: string | number = date.getMinutes()
        minute = minute < 10 ? `0${{String(minute)}` : minute
        let second: string | number = date.getSeconds()
        second = second < 10 ? `0${{String(second)}` : second
        return `${{String(y)}-${{String(m)}-${{String(d)}   ${{String(h)}:${{String(
            minute
        )}:${{String(second)}`
    }
}

export function formatDatefordate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${{year}-${{month}-${{day} ${{hours}:${{minutes}:${{seconds}`;
}
